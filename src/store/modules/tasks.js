/* eslint no-shadow: ["error", { "allow": ["state"] }] */
/* eslint no-underscore-dangle: 0 */

const state = () => ({
  tasks: [],
  completed: false,
  limit: 5,
  skip: 0,
  sortBy: 'createdAt',
  sortOrder: 'desc',
});

const mutations = {
  setTasks(state, tasks) {
    state.tasks = tasks;
  },

  addTasks(state, tasks) {
    state.tasks = [...state.tasks, ...tasks];
  },

  addTask(state, task) {
    state.tasks.unshift(task);
  },

  deleteTask(state, _id) {
    state.tasks = state.tasks.filter((task) => task._id !== _id);
  },

  updateTask(state, { _id, ...task }) {
    state.tasks = state.tasks.map((t) => {
      if (t._id === _id) return { _id, ...task };
      return t;
    });
  },
};

const actions = {
  async getTasks({ commit, rootState }, {
    completed = false,
    sortBy = 'createdAt',
    limit = 5,
    skip = 0,
  }) {
    const { token } = rootState.auth;

    const res = await fetch(
      `https://porras-task-manager.herokuapp.com/tasks?completed=${completed}&sortBy=${sortBy}&limit=${limit}&skip=${skip}`,
      {
        method: 'GET',
        headers: {
          Authorization: `Bearer ${token}`,
        },
      },
    );

    if (res.status !== 200) {
      throw new Error('Something went wrong, please try again.');
    }

    const tasks = await res.json();

    if (skip !== 0) {
      if (!tasks.length) {
        throw new Error('No more tasks to load.');
      } else commit('addTasks', tasks);
    } else commit('setTasks', tasks);
  },

  async createTask({ commit, rootState }, description) {
    const { token } = rootState.auth;

    const res = await fetch(
      'https://porras-task-manager.herokuapp.com/tasks',
      {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-type': 'application/json',
        },
        body: JSON.stringify({ description }),
      },
    );

    const json = await res.json();

    if (res.status !== 201) {
      throw new Error(json.message);
    }

    commit('addTask', json);
  },

  async updateTask({ commit, rootState }, { _id, updates }) {
    const { token } = rootState.auth;

    const res = await fetch(
      `https://porras-task-manager.herokuapp.com/tasks/${_id}`,
      {
        method: 'PATCH',
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-type': 'application/json',
        },
        body: JSON.stringify(updates),
      },
    );

    const json = await res.json();

    if (res.status !== 200) {
      throw new Error(json);
    }

    if (Object.keys(updates).includes('completed')) {
      commit('deleteTask', _id);
    } else {
      commit('updateTask', json);
    }
  },

  async deleteTask({ commit, rootState }, _id) {
    const { token } = rootState.auth;

    const res = await fetch(
      `https://porras-task-manager.herokuapp.com/tasks/${_id}`,
      {
        method: 'DELETE',
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-type': 'application/json',
        },
      },
    );

    if (res.status !== 200) {
      const json = await res.json();
      throw new Error(json);
    }

    commit('deleteTask', _id);
  },
};

export default {
  state,
  mutations,
  actions,
};
