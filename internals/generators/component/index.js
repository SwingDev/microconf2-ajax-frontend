const { componentExists } = require('../../helpers');

const TYPE = {
  stateless: 'React.SFC',
  classy: 'React.Component'
};

const getTemplate = (type) => {
  switch (type) {
    case TYPE.stateless:
      return './generators/component/stateless.tsx.hbs'

    default:
      return './generators/component/class.tsx.hbs'
  }
}

module.exports = {
  description: 'Add component',
  prompts: [{
    type: 'list',
    name: 'type',
    message: 'Select the type of component',
    default: TYPE.stateless,
    choices: () => [
      TYPE.stateless,
      TYPE.classy
    ],
  }, {
    type: 'input',
    name: 'name',
    message: 'What should it be called?',
    default: 'Button',
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
    name: 'hasStyles',
    default: true,
    message: 'Do you want styles?',
  }],
  actions: (data) => {
    const template = getTemplate(data.type);

    const actions = [
      {
        type: 'add',
        path: '../src/components/{{properCase name}}/index.tsx',
        templateFile: template,
        abortOnFail: true,
      },
    ];

    if (data.hasStyles) {
      actions.push({
        type: 'add',
        path: '../src/components/{{properCase name}}/styles.scss',
        templateFile: './generators/component/styles.scss.hbs',
        abortOnFail: true
      });
    }

    return actions;
  }
};
