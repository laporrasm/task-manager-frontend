import { extend, setInteractionMode } from 'vee-validate';

import {
  confirmed,
  email,
  image,
  integer,
  min,
  size,
  required,
} from 'vee-validate/dist/rules';

setInteractionMode('passive');

extend('confirmed', {
  ...confirmed,
  message: 'The {_field_} field must have the same value as the confirmation field',
});

extend('email', {
  ...email,
  message: 'Invalid email address',
});

extend('image', {
  ...image,
  message: 'The {_field_} must be an image',
});

extend('integer', integer);

extend('min', {
  ...min,
  message: 'The {_field_} field must have at least {length} characters',
});

extend('positive', {
  validate: (value) => value >= 0,
  message: 'The {_field_} field must be a positive number',
});

extend('size', {
  ...size,
  message: 'The maximum size is {size} KB',
});

extend('required', {
  ...required,
  message: 'The {_field_} field is required',
});
