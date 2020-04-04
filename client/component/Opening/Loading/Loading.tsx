import React, { FC } from 'react';

import s from './Loading.scss';
import { Props } from './types';

const Loading: FC<Props> = ({ percent, size }) =>
	<div className={`${s.loading} ${percent === 100 ? s.fadeout : ''}`}>
		<p>{percent}%</p>
		<p className={s.loadingBar} style={{ width: `${size.width * percent / 100}%` }} />
	</div>

export default Loading;