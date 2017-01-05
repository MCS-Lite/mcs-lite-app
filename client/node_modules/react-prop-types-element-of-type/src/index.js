import {
  default as ReactElement,
} from "react/lib/ReactElement";

import {
  default as ReactPropTypeLocationNames,
} from "react/lib/ReactPropTypeLocationNames";

const ANONYMOUS = `<<anonymous>>`;

/* Check if the given element is created by specific Component. i.e.,
 * `element = React.createElement(Component, {})`
 *
 * @author: @cassiozen
 * @origin: https://github.com/facebook/react/pull/4716
 */
export default function createComponentTypeChecker(expectedComponent) {
  function validate(isRequired, props, propName, componentName, location, propFullName = propName) {
    const locationName = ReactPropTypeLocationNames[location];
    if (props[propName] === null || props[propName] === undefined) {
      if (isRequired) {
        return new Error(
          `Required ${locationName} \`${propFullName}\` was not specified in ` +
          `\`${componentName}\`.`
        );
      } else {
        return null;
      }
    }

    const actualComponent = props[propName].type;
    if (!ReactElement.isValidElement(props[propName]) || actualComponent !== expectedComponent) {
      const expectedComponentName = getComponentName(expectedComponent);
      const actualComponentName = getComponentName(actualComponent);

      const extraMessage = getExtraMessage(expectedComponent, actualComponent);

      return new Error(
        `Invalid ${locationName} \`${propFullName}\` of element type ` +
        `\`${actualComponentName}\` supplied to \`${componentName}\`, expected ` +
        `element type \`${expectedComponentName}\`.${extraMessage}`
      );
    }
    return null;
  }

  const validator = validate.bind(null, false);
  validator.isRequired = validate.bind(null, true);
  return validator;
}

// Returns class name of the object, if any.
function getComponentName(componentClass) {
  return componentClass && componentClass.name || ANONYMOUS;
}

function getExtraMessage(expectedComponent, actualComponent) {
  if (expectedComponent.prototype.isPrototypeOf(actualComponent.prototype)) {
    return ` ` + (
      `Notice that component inheritance is discouraged in React. ` +
      `See discussions here: ` +
      `https://github.com/facebook/react/pull/4716#issuecomment-135145263`
    );
  }
  return ``;
}
