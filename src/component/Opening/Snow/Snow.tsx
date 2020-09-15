import React, { FC, useRef, useEffect } from 'react';
import styles from './styles.module.scss';
import { Props } from './types'
import { SnowSys } from './SnowSys';

const ratio = 2;

const Snow: FC<Props> = ({ size }) => {
	const ref = useRef<HTMLCanvasElement>(null);
	useEffect(() => {
		let timer: number;
		if (ref.current) {
			const context = ref.current.getContext('2d');
			if (!context) { return; }
			const { width, height } = size;
			const sc = new SnowSys(context, width * ratio, height * ratio)

			const draw = () => {
				context.clearRect(0, 0, width * ratio, height * ratio);
				sc.display();
				timer = requestAnimationFrame(draw);
			}
			timer = requestAnimationFrame(draw)
		}

		return () => cancelAnimationFrame(timer);
	}, [ref.current])

	return <canvas
		ref={ref}
		className={styles.canvas}
		style={{ width: `${size.width}px`, height: `${size.height}px` }}
		width={size.width * ratio} height={size.height * ratio}
	>Your browser can not support canvas</canvas>
}

export default Snow;