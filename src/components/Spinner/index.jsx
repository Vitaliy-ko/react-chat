import React from 'react';

import styles from './index.module.scss';

export const Spinner = () => (
  <div className={styles.spinner}>
    <div className={styles.loader}>Loading...</div>
  </div>
);
