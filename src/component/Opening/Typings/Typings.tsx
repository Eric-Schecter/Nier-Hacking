import React, { FC, useEffect, useState, useRef } from 'react';

import styles from './styles.module.scss';
import { Props } from './types';
import { delay } from '../../../functions/delay';
import { useGetContext } from '../../Home/Home';
import { sounds } from '../../../sounds';

const Typings: FC<Props> = ({ str, toMenu, setIsHide }) => {
	const [typingStr, setTypingStr] = useState('');
	const audioRef = useGetContext();
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
	}, [str])
	const ishideRef = useRef(true);
	useEffect(() => {
		const hide = async () => {
			if(!ishideRef.current){return}
			ishideRef.current = false;
			setIsHide(true);
			audioRef.current?.play(sounds.enter.src);
			await delay(500);
			toMenu();
		}
		if (typingStr.length === str.length) {
			window.addEventListener('keydown', hide)
		}
		return () => window.removeEventListener('keydown', hide);
	}, [typingStr,audioRef,str,setIsHide,toMenu])
	return <div className={styles.start}>{typingStr}</div>
}

export default Typings;