import React, { FC, useEffect, useState } from 'react';

import s from './Typings.scss';
import { Props } from './types';
import { delay } from '../../../functions/delay';
import { getContext } from '../../Home/Home';
import { sounds } from '../../../sounds';

const Typings: FC<Props> = ({ str, toMenu, setIsHide }) => {
	const [typingStr, setTypingStr] = useState('');
	const audioRef = getContext();
	useEffect(() => {
		const type = async () => {
			const arr = str.split('');
			await delay(5000);
			for (let i = 0; i < arr.length; i++) {
				setTypingStr(pre => pre + arr[i])
				await delay(50);
			}
		}
		type();
	}, [])
	useEffect(() => {
		const hide = async () => {
			setIsHide(true);
			audioRef.current?.play(sounds.enter.src);
			await delay(500);
			toMenu();
		}
		if (typingStr.length === str.length) {
			window.addEventListener('keydown', hide)
		}
		return () => window.removeEventListener('keydown', hide);
	}, [typingStr])
	return <div className={s.start}>{typingStr}</div>
}

export default Typings;