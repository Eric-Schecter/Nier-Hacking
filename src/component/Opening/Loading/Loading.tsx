import React, { FC, useState } from 'react';

import s from './Loading.scss';
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
		className={`${s.loading} ${isFade ? s.fadeout : ''}`}>
		<p>{percent}%</p>
		<p className={s.loadingBar} style={{ width: `${size.width * percent / 100}px` }} />
		{percent === 100 && <div className={s.wave} >Start</div>}
	</div>
}


export default Loading;