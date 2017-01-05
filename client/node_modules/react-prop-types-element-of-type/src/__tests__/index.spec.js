/* eslint-disable prefer-arrow-callback */
/* eslint-disable react/no-multi-comp */
/* eslint-disable react/prefer-stateless-function */
import {
  default as expect,
} from "expect";

import {
  default as React,
  Component,
} from "react";

import {
  unmountComponentAtNode,
  render,
} from "react-dom";

import {
  default as ReactPropTypeLocations,
} from "react/lib/ReactPropTypeLocations";

import {
  default as propTypesElementOfType,
} from "../index";

describe(`propTypesElementOfType`, function describePropTypesElementOfType() {
  let domEl;
  let ChildComponent;
  let WrapperComponent;
  let consoleErrorSpy;

  beforeEach(function beforeEachPropTypesElementOfType() {
    domEl = document.createElement(`div`);

    ChildComponent = class C extends Component {
      render() {
        return <div>Child</div>;
      }
    };

    /* eslint-disable react/prefer-es6-class */
    WrapperComponent = React.createClass({
      propTypes: {
        childElement: propTypesElementOfType(ChildComponent).isRequired,
      },

      render() {
        return <div>{this.props.childElement}</div>;
      },
    });
    /* eslint-enable react/prefer-es6-class */

    consoleErrorSpy = expect.spyOn(console, `error`);
  });

  afterEach(function bafterEachPropTypesElementOfType() {
    consoleErrorSpy.restore();
    unmountComponentAtNode(domEl);
    domEl = null;
  });

  it(`should warn for invalid element`, function it() {
    render(<WrapperComponent childElement={<div />} />, domEl);

    expect(consoleErrorSpy.calls.length).toBe(1);
  });

  it(`should warn when passing no element and isRequired is set`, function it() {
    render(<WrapperComponent />, domEl);

    expect(consoleErrorSpy.calls.length).toBe(1);
  });

  it(`should not warn for valid element`, function it() {
    render(<WrapperComponent childElement={<ChildComponent />} />, domEl);

    expect(consoleErrorSpy.calls.length).toBe(0);
  });

  it(`should be implicitly optional and not warn without values`, function it() {
    typeCheckPass(propTypesElementOfType(ChildComponent), null);
    typeCheckPass(propTypesElementOfType(ChildComponent), undefined);
  });

  describe(`component inheritance`, function describeComponentInheritance() {
    it(`should warn that`, function it() {
      class XGrandChildComponent extends ChildComponent {
        render() {
          return <div>GrandChild</div>;
        }
      }

      render(<WrapperComponent childElement={<XGrandChildComponent />} />, domEl);

      expect(consoleErrorSpy.calls.length).toBe(1);
    });

    it(`should contains message that points back to GitHub issue thread`, function it() {
      class YGrandChildComponent extends ChildComponent {
        render() {
          return <div>GrandChild</div>;
        }
      }

      render(<WrapperComponent childElement={<YGrandChildComponent />} />, domEl);

      expect(consoleErrorSpy.calls[0].arguments[0]).toInclude(`facebook/react/pull/4716`);
    });
  });
});

// copy from facebook/react@0.14-stable: http://git.io/v4pv5
function typeCheckPass(declaration, value) {
  const props = { testProp: value };
  const error = declaration(
    props,
    `testProp`,
    `testComponent`,
    ReactPropTypeLocations.prop
  );
  expect(error).toBe(null);
}
