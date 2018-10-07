const { componentExists } = require('../../helpers');

module.exports = {
  description: 'Add view',
  prompts: [{
    type: 'input',
    name: 'name',
    message: 'What should it be called?',
    default: 'Login',
    validate: value => {
      if (/.+/.test(value)) {
        return componentExists(value)
          ? 'A component or container with this name already exists'
          : true;
      }

      return 'The name is required';
    },
  }, {
      type: 'confirm',
      name: 'isConnected',
      default: false,
      message: 'Do you want to connect view to store?',
  }, {
    type: 'confirm',
    name: 'hasStateMap',
    default: true,
    message: 'Do you want to add state map function?',
    when: (data) => data.isConnected
  }, {
    type: 'confirm',
    name: 'hasStyles',
    default: true,
    message: 'Do you want styles?',
  }, {
    type: 'confirm',
    name: 'withMeta',
    default: true,
    message: 'Do you want to add meta data (react-helmet)?',
  }],
  actions: (data) => {
    const actions = [
      {
        type: 'add',
        path: '../src/views/{{dashCase name}}/index.tsx',
        templateFile: './generators/view/class.tsx.hbs',
        abortOnFail: true,
      },
    ];

    if (data.hasStyles) {
      actions.push({
        type: 'add',
        path: '../src/views/{{dashCase name}}/styles.scss',
        templateFile: './generators/view/styles.scss.hbs',
        abortOnFail: true
      });
    }

    return actions;
  }
};
