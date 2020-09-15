import React, { FC, useState } from 'react';

import styles from './styles.module.scss';
import { Props } from './types';
import { delay } from '../../../functions/delay';

const Loading: FC<Props> = ({ percent, size, setIsStart }) => {
	const [isFade, setIsFade] = useState(false);
	const start = async () => {
		if (percent === 100) {
			setIsFade(true)
			await delay(1000);
			setIsStart(true)
		}
	}
	return <div onClick={start}
		className={`${styles.loading} ${isFade ? styles.fadeout : ''}`}>
		<p>{percent}%</p>
		<p className={styles.loadingBar} style={{ width: `${size.width * percent / 100}px` }} />
		{percent === 100 && <div className={styles.wave} >Start</div>}
	</div>
}


export default Loading;