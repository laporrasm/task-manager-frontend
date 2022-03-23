/* eslint no-shadow: ["error", { "allow": ["doc", "state"] }] */
/* eslint no-underscore-dangle: 0 */

const state = () => ({
  authLoader: true,
  token: '',
  user: null,
  avatar: null,
});

const mutations = {
  setAuthLoader(state, payload) {
    state.authLoader = payload;
  },
  setToken(state, token) {
    state.token = token;
  },
  setUser(state, user) {
    state.user = user;
  },
  setAvatar(state, url) {
    state.avatar = url;
  },
};

const actions = {
  async authenticate({ commit, dispatch }) {
    const token = localStorage.getItem('token');

    if (!token) {
      commit('setAuthLoader', false);
      throw new Error('No active session, please sign in');
    }

    const res = await fetch(
      'https://porras-task-manager.herokuapp.com/users/me',
      {
        method: 'GET',
        headers: {
          Authorization: `Bearer ${token}`,
        },
      },
    );

    if (res.status === 401) {
      dispatch('clearUser');
      commit('setAuthLoader', false);
      throw new Error('No active session, please sign in');
    }

    const user = await res.json();

    commit('setUser', user);
    commit('setToken', token);
    commit('setAuthLoader', false);
    dispatch('getAvatar');
  },

  async login({ commit }, credentials) {
    const res = await fetch(
      'https://porras-task-manager.herokuapp.com/users/login',
      {
        method: 'POST',
        headers: {
          'Content-type': 'application/json',
        },
        body: JSON.stringify(credentials),
      },
    );

    if (res.status !== 200) {
      throw new Error('Could not login, please try again.');
    }

    const { token, user } = await res.json();

    localStorage.setItem('token', token);

    commit('setUser', user);
    commit('setToken', token);
  },

  async register({ commit }, formData) {
    const res = await fetch(
      'https://porras-task-manager.herokuapp.com/users',
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      },
    );

    const json = await res.json();

    if (res.status !== 201) {
      throw new Error(json.message);
    }

    localStorage.setItem('token', json.token);

    commit('setUser', json.user);
    commit('setToken', json.token);
  },

  async logout({ commit, dispatch, state }) {
    commit('setAuthLoader', true);

    const res = await fetch(
      'https://porras-task-manager.herokuapp.com/users/logout',
      {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${state.token}`,
        },
      },
    );

    if (res.status !== 200) {
      commit('setAuthLoader', false);
      throw new Error('Something went wrong, please try again');
    }

    dispatch('clearUser');
    commit('setAuthLoader', false);
  },

  async updateProfile({ commit, state }, updates) {
    const res = await fetch(
      'https://porras-task-manager.herokuapp.com/users/me',
      {
        method: 'PATCH',
        headers: {
          Authorization: `Bearer ${state.token}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(updates),
      },
    );

    const json = await res.json();

    if (res.status !== 200) {
      throw new Error(json);
    }

    commit('setUser', json);
  },

  async updatePassword({ state }, password) {
    const res = await fetch(
      'https://porras-task-manager.herokuapp.com/users/me',
      {
        method: 'PATCH',
        headers: {
          Authorization: `Bearer ${state.token}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ password }),
      },
    );

    if (res.status !== 200) {
      throw new Error('Something went wrong, please try again');
    }
  },

  async deleteAccount({ commit, dispatch, state }) {
    commit('setAuthLoader', true);

    const res = await fetch(
      'https://porras-task-manager.herokuapp.com/users/me',
      {
        method: 'DELETE',
        headers: {
          Authorization: `Bearer ${state.token}`,
        },
      },
    );

    commit('setAuthLoader', false);

    if (res.status !== 200) {
      throw new Error('Something went wrong, please try again');
    }

    dispatch('clearUser');
    commit('setAuthLoader', false);
  },

  async logoutAll({ commit, dispatch, state }) {
    commit('setAuthLoader', true);

    const res = await fetch(
      'https://porras-task-manager.herokuapp.com/users/logoutAll',
      {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${state.token}`,
        },
      },
    );

    if (res.status !== 200) {
      commit('setAuthLoader', false);
      throw new Error('Something went wrong, please try again.');
    }

    dispatch('clearUser');
    commit('setAuthLoader', false);
  },

  clearUser({ commit }) {
    localStorage.removeItem('token');
    commit('setUser', null);
    commit('setToken', '');
    commit('setAvatar', null);
  },

  async addAvatar({ commit, state }, formData) {
    const res = await fetch(
      'https://porras-task-manager.herokuapp.com/users/me/avatar',
      {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${state.token}`,
        },
        body: formData,
      },
    );

    if (res.status !== 200) {
      const { error } = await res.json();
      throw new Error(error);
    }

    const avatarURL = `https://porras-task-manager.herokuapp.com/users/${state.user._id}/avatar`;
    commit('setAvatar', avatarURL);
  },

  async removeAvatar({ commit, state }) {
    const res = await fetch(
      'https://porras-task-manager.herokuapp.com/users/me/avatar',
      {
        method: 'DELETE',
        headers: {
          Authorization: `Bearer ${state.token}`,
        },
      },
    );

    if (res.status !== 200) {
      throw new Error('Something went wrong. Please try again.');
    }

    commit('setAvatar', null);
  },

  async getAvatar({ commit, state }) {
    const res = await fetch(
      `https://porras-task-manager.herokuapp.com/users/${state.user._id}/avatar`,
      { method: 'GET' },
    );

    if (res.status !== 200) {
      throw new Error('Something went wrong. Please try again.');
    }

    commit(
      'setAvatar',
      `https://porras-task-manager.herokuapp.com/users/${state.user._id}/avatar`,
    );
  },
};

export default {
  state,
  mutations,
  actions,
};
