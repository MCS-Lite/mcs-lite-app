import { connect } from 'react-redux';
import React, { Component } from 'react';

import newPrototypeCardStyles from './newPrototypeCard.css';
import Button from 'mtk-ui/lib/Button';

const NewPrototypeCardLayout = () => {
  return (
    <div className={newPrototypeCardStyles.base}>
      Create your prototype now!
      <Button type="submit" className={newPrototypeCardStyles.button}>
        Create
      </Button>
    </div>
  );
}

export default NewPrototypeCardLayout;