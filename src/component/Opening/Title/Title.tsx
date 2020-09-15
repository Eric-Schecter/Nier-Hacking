import React, { FC } from 'react';

import styles from './styles.module.scss';
import { Props } from './types'

const Title: FC<Props> = ({ size: { width } }) => {
	const step = 0.2;
	return <svg className={styles.svg} width={width} height='200'>
		<g style={{ transform: `translateX(${width / 2 - 400}px)` }}>
			<g className={styles.container}>
				<path d="M54.2,51.2c0,1.1-0.2,3-0.6,5.6c-0.4,2.4-1.6,3.6-3.8,3.6c-1.3,0-2.8-0.8-4.6-2.5c-9.5-9-20.5-22-32.8-39.1
		l-0.2,8l-0.1,8c0,1.9,0,4.9,0.1,8.8c0.1,3.9,0.1,6.8,0.1,8.8c0,6.3-1.2,9.5-3.7,9.5c-1.3,0-2.3-0.4-3.1-1.2c-0.7-0.7-1-1.6-1-2.6
		c0-1,0.1-2.5,0.2-4.5C5,51.5,5.1,50,5.1,49c0-1.5,0-3.6,0.1-6.5c0.1-2.9,0.1-5.1,0.1-6.5c0-1.5,0-3.9-0.1-7s-0.1-5.5-0.1-7
		c0-1.5-0.1-3.7-0.4-6.6s-0.4-5.1-0.4-6.6c0-1.1,0.5-2.1,1.4-3c0.9-0.9,2-1.3,3.1-1.3c1.2,0,2.8,1.4,4.6,4.1
		c5.8,8.7,11.1,16,15.8,21.8c5.6,6.9,11.6,13.4,18.3,19.7c0.1-1,0.1-2.5,0-4.5l-0.1-4.4c0-10.3-0.4-18.5-1.2-24.6
		c-0.1-0.6-0.4-1.8-0.9-3.7c-0.5-1.6-0.7-2.8-0.7-3.7c0-2.7,1.2-4.1,3.7-4.1c4.1,0,6.1,7.6,6.1,22.8c0,2.6,0,6.5-0.1,11.7
		S54.2,48.6,54.2,51.2z"/>
				<path style={{ animationDelay: `${step}s` }} d="M70.6,43c0,1.4,0,3.5,0.1,6.3c0.1,2.8,0.1,4.9,0.1,6.3c0,1-0.3,1.9-0.9,2.5c-0.6,0.7-1.5,1-2.5,1
		c-1,0-1.8-0.3-2.5-1c-0.6-0.7-1-1.5-1-2.5c0-1.4,0-3.5-0.1-6.3c-0.1-2.8-0.1-4.9-0.1-6.3c0-2.2,0.1-5,0.4-8.2
		c0.2-3.3,0.4-6,0.4-8.2c0-1.1,0.3-1.9,1-2.6c0.6-0.7,1.5-1,2.5-1s1.8,0.3,2.5,1c0.6,0.7,1,1.5,1,2.6c0,2.2-0.1,5-0.4,8.2
		C70.7,38.1,70.6,40.8,70.6,43z M69,14.5c-1.1,0-2.1-0.4-2.9-1.2c-0.8-0.8-1.2-1.8-1.2-2.9s0.4-2.1,1.2-2.9c0.8-0.8,1.8-1.2,2.9-1.2
		s2.1,0.4,2.9,1.2c0.8,0.8,1.2,1.8,1.2,2.9s-0.4,2.1-1.2,2.9C71.1,14.1,70.1,14.5,69,14.5z"/>
				<path style={{ animationDelay: `${2 * step}s` }} d="M98.9,60.6c-5.3,0-9.6-1.3-12.9-4c-3.6-2.9-5.4-7-5.4-12.3c0-6.1,1.5-11.2,4.4-15.3c3.2-4.5,7.5-6.8,12.9-6.8
		c3.9,0,7.1,0.7,9.5,2c3,1.6,4.5,4.1,4.5,7.5c0,2.3-1.3,4.5-4,6.4c-1.2,0.8-3.7,2.2-7.5,3.9l-13.4,6.4c1.3,1.9,2.9,3.4,4.9,4.4
		s4.2,1.5,6.8,1.5c1.6,0,3.5-0.3,5.7-0.9c2.8-0.8,4.5-1.8,5.3-3c0.8-1.3,1.7-1.9,2.6-1.9c0.8,0,1.6,0.3,2.2,0.9c0.6,0.6,1,1.3,1,2.2
		c0,2.6-2.1,4.8-6.3,6.7C105.8,59.8,102.3,60.6,98.9,60.6z M97.9,28.6c-2.9,0-5.2,1.1-7.1,3.3s-3.3,5.5-4.3,10l10.8-5.1
		c4.2-2.1,7.3-3.9,9.1-5.4C104.4,29.5,101.5,28.6,97.9,28.6z"/>
				<path style={{ animationDelay: `${3 * step}s` }} d="M149.2,33c-0.2,2.9-1.3,4.4-3.5,4.4c-2,0-3-1.2-3-3.5c0-0.4,0-1.3-0.1-2.5l-0.1-3c-3.7,0.4-6.7,1.5-8.9,3.1
		c-2.1,1.5-3.8,3.8-5.2,6.9l0.1,19.3c0,2.4-1.2,3.6-3.5,3.6c-2.1,0-3.1-1.2-3.1-3.6V33.1c0-0.8,0-1.9,0.1-3.5s0.1-2.7,0.1-3.5
		c0-2.4,1-3.6,3.1-3.6c2.3,0,3.5,1.9,3.5,5.8c4.5-4.3,9.5-6.5,15-6.5c1.9,0,3.3,0.7,4.3,2.1c0.9,1.4,1.4,3.6,1.4,6.5
		C149.3,31.8,149.3,32.6,149.2,33z"/>
				<path style={{ animationDelay: `${4 * step}s` }} d="M165.6,25.4c0,1.1-0.3,1.9-1,2.6c-0.7,0.7-1.5,1-2.6,1s-1.9-0.3-2.6-1c-0.7-0.7-1-1.5-1-2.6
		c0-0.3-0.1-0.7-0.2-1.3c-0.1-0.6-0.2-1-0.2-1.3c0-1,0.4-1.8,1.1-2.5c0.7-0.7,1.6-1,2.6-1C164.3,19.3,165.6,21.3,165.6,25.4z
		 M166.1,51.1c0,1.1-0.3,1.9-1,2.6c-0.7,0.7-1.5,1-2.6,1s-1.9-0.3-2.6-1c-0.7-0.7-1-1.5-1-2.6c0-0.4-0.1-1.1-0.2-2
		c-0.2-0.9-0.2-1.5-0.2-1.9c0-1,0.4-1.8,1.1-2.5c0.7-0.7,1.6-1,2.6-1C164.8,43.7,166.1,46.2,166.1,51.1z"/>
				<path style={{ animationDelay: `${5 * step}s` }} d="M238.6,60.1c-2.2,0-4-2.8-5.6-8.3c-0.6-2.1-1.4-5.8-2.3-11.1c-2.4,0.3-5.5,0.9-9.4,1.8l-9.4,1.9
		c-1.2,3.1-3.2,7.6-6,13.5c-0.8,1.3-1.8,2-3.1,2c-0.9,0-1.8-0.3-2.5-1s-1.1-1.5-1.1-2.5c0-1.1,1.8-5.4,5.3-12.8
		c-0.4-0.6-0.6-1.3-0.6-2.1c0-1.9,1.1-3.1,3.4-3.7c2.7-5,6-10.8,10.1-17.3c5.6-8.9,9-13.3,10.4-13.3c1.9,0,3.1,1.3,3.8,3.9l2.2,11.8
		l5.2,24.4l2,5.6c0.7,1.9,1,3.2,1,3.8c0,1-0.4,1.9-1.1,2.5S239.5,60.1,238.6,60.1z M226.2,19.9l-10.1,16.2c2.8-0.7,7.1-1.6,12.9-2.6
		L226.2,19.9z"/>
				<path style={{ animationDelay: `${6 * step}s` }} d="M280.9,38.5c0,1.7,0,4.2,0,7.6s0,5.9,0,7.6c0,0.5,0,1.3,0.1,2.4s0.1,1.8,0.1,2.4c0,1-0.3,1.8-1,2.5
		s-1.5,1-2.5,1c-1.8,0-3-1.1-3.4-3.3c-2.9,1.5-6.3,2.3-10.1,2.3c-3.1,0-5.6-0.7-7.6-2c-2.2-1.5-3.6-3.7-4-6.6
		c-0.9-6.2-1.4-11.7-1.4-16.6c0-3.2,0.4-6.9,1.1-11c0.3-2,1.4-3.1,3.3-3.1c1,0,1.9,0.3,2.5,1c0.7,0.6,1,1.5,1,2.5
		c0,1.1-0.2,2.8-0.5,5.2c-0.3,2.4-0.5,4.2-0.5,5.4c0,3.9,0.1,7.3,0.4,10.1c0.3,2.8,0.6,5,1.2,6.7c0.8,0.4,1.5,0.7,2.3,1
		c0.8,0.2,1.5,0.3,2.2,0.3c3.1,0,6.5-0.5,9.9-1.5l0-7.1l-0.1-6.8c0-5.1,0.2-9.5,0.7-13.2c0.3-2.2,1.4-3.2,3.4-3.2c1,0,1.9,0.3,2.5,1
		c0.7,0.7,1,1.5,0.9,2.5L280.9,38.5z"/>
				<path style={{ animationDelay: `${7 * step}s` }} d="M313.1,29c-0.5,0-1.1,0-1.7-0.1c-0.7,0-1.2-0.1-1.7-0.1c-0.5,0-2.1,0.2-4.8,0.5l0.7,20.8l0,1.5l0,1.8
		c0.1,5.1-1.1,7.7-3.7,7.7c-0.9,0-1.8-0.3-2.4-0.9s-1-1.4-1-2.3c0-0.9,0-2.2,0.1-4c0.1-1.8,0.1-3.1,0.1-4l-0.7-20.5
		c-1.7-0.1-4.3-0.3-7.8-0.6c-2.1-0.3-3.1-1.4-3.1-3.5c0-1,0.3-1.9,0.9-2.6c0.6-0.7,1.4-1,2.4-1l7.4,0.6c0-1.2-0.1-2.8-0.2-4.8
		s-0.2-3.5-0.2-4.3c0-1,0.3-1.8,1-2.4c0.7-0.6,1.5-1,2.5-1c2.1,0,3.3,1.7,3.7,5.2c0.1,0.9,0.1,1.9,0.1,3.1l-0.1,2l0,2.2
		c2.9-0.4,4.6-0.6,5-0.6c2.4,0,4,0.1,4.8,0.4c1.4,0.5,2.1,1.6,2.1,3.3c0,1-0.3,1.9-1,2.5S314.1,29,313.1,29z"/>
				<path style={{ animationDelay: `${8 * step}s` }} d="M336.7,61.1c-3.9,0-7.3-1.5-10.2-4.4c-3.2-3.2-4.8-7.6-5-13c-0.1-5.3,1.2-10,4-14c3.3-4.8,7.9-7.1,13.7-7.1
		c4.7,0,8.2,2.1,10.7,6.4c1.9,3.5,2.8,7.6,2.8,12.5c-0.1,5.2-1.4,9.6-4.1,13.3C345.6,59,341.7,61.1,336.7,61.1z M338.8,29.7
		c-3.4,0-6.1,1.6-8.1,4.9c-1.5,2.6-2.3,5.7-2.3,9.1c0,3.4,0.9,6,2.8,7.9c1.5,1.6,3.4,2.4,5.4,2.4c2.4,0,4.5-0.9,6.3-2.7
		c2-2,3-4.6,3.2-8C346.5,34.2,344.1,29.7,338.8,29.7z"/>
				<path style={{ animationDelay: `${9 * step}s` }} d="M406.1,61.9c-1.9,0-3-1-3.4-3.1c-0.4-2.6-0.8-6.2-1.3-10.9l-1.2-10.9c-0.2-1.6-0.6-3.2-1.2-4.7
		c-0.8-2.1-1.7-3.2-2.6-3.2c-0.9,0-2.5,0.7-4.9,2.2c-2.2,1.4-3.7,2.4-4.4,3.3c0,2.2,0,4.4,0.2,6.6l1.1,9.4c0.4,3.7,0.7,6.8,0.7,9.2
		c0,1-0.3,1.9-1,2.5s-1.5,1-2.5,1s-1.8-0.3-2.5-1s-1-1.5-1-2.5c0-2.8-0.3-7-0.9-12.6c-0.6-5.5-0.9-9.7-0.9-12.6
		c0-2.5-0.4-4.4-1.1-5.8c-1.6,0.8-3.3,2-5,3.7l-4.1,4.6c-0.4,0.6-1,1.3-1.8,2.2c0,1.4-0.1,3.5-0.4,6.2s-0.4,4.8-0.4,6.1
		c0,0.7,0.1,1.7,0.3,3s0.3,2.2,0.3,2.7c0,1-0.4,1.8-1.1,2.4s-1.6,1-2.5,1c-2.6,0-4-3-4-9c0-1.4,0.1-3.5,0.4-6.3
		c0.3-2.8,0.4-4.9,0.4-6.3c0-1.2-0.1-3.1-0.3-5.6c-0.2-2.5-0.3-4.4-0.3-5.6c0-5.3,1.2-8,3.6-8c0.9,0,1.8,0.4,2.5,1.2
		c0.8,0.8,1.1,1.7,1.1,2.6c0,0.4-0.1,1.1-0.2,2.1c-0.1,0.9-0.2,1.7-0.2,2.1l0.1,3.7c1.2-2.5,3-4.8,5.4-6.8c2.4-2,4.4-3,6-3
		c3.7,0,6.2,1.8,7.6,5.5c1.3-1.7,2.8-3,4.6-3.8c1.8-0.9,3.8-1.3,6.1-1.3c3.9,0,6.6,2.1,8,6.3c0.3,0.8,0.8,4.1,1.4,9.9
		c0.7,4,1.5,10.7,2.5,20.1c0.1,0.9-0.2,1.7-0.9,2.4S407.1,61.9,406.1,61.9z"/>
				<path style={{ animationDelay: `${10 * step}s` }} d="M444.8,61.3c-0.4,0-1.3-0.5-2.4-1.5c-1.1-1-1.8-1.8-2.4-2.6c-2.2,1.2-4.2,2.1-5.9,2.8s-3.1,0.9-4.3,0.9
		c-5.5,0-9.5-1.5-12-4.6c-2.4-2.9-3.6-7.4-3.6-13.4c0-5.7,2-10.5,5.9-14.6c3.9-4,8.6-6,14-6c2,0,4.3,0.5,6.9,1.6
		c3.2,1.3,4.8,2.9,4.8,4.7c0,0.6-0.2,1.2-0.7,1.7c-0.2,0.9-0.4,2.4-0.5,4.4s-0.2,4.7-0.2,7.8c0,2.9,0.2,5.2,0.6,6.9
		c0.2,1,1,3.1,2.2,6.2c0.2,0.4,0.4,1,0.8,1.9l0.2,0.6c0,0.9-0.3,1.7-1,2.3S445.7,61.3,444.8,61.3z M437.5,36.9c0-1,0.1-2.1,0.2-3.3
		c0.1-1.2,0.3-2.4,0.6-3.8c-0.9-0.4-1.6-0.8-2.2-1s-1.1-0.3-1.5-0.3c-3.6,0-6.8,1.5-9.4,4.4c-2.6,3-4,6.4-4,10.2
		c0,3.8,0.7,6.7,2,8.6c1.4,1.9,3.4,2.9,6.1,2.9c2.2,0,4.2-0.4,5.7-1.2c0.8-0.4,2-1.3,3.6-2.7C437.9,44.6,437.5,40,437.5,36.9z"/>
				<path style={{ animationDelay: `${11 * step}s` }} d="M477.7,29c-0.5,0-1.1,0-1.7-0.1c-0.7,0-1.2-0.1-1.7-0.1c-0.5,0-2.1,0.2-4.8,0.5l0.7,20.8l0,1.5l0,1.8
		c0.1,5.1-1.1,7.7-3.7,7.7c-0.9,0-1.8-0.3-2.4-0.9s-1-1.4-1-2.3c0-0.9,0-2.2,0.1-4c0.1-1.8,0.1-3.1,0.1-4l-0.7-20.5
		c-1.7-0.1-4.3-0.3-7.8-0.6c-2.1-0.3-3.1-1.4-3.1-3.5c0-1,0.3-1.9,0.9-2.6c0.6-0.7,1.4-1,2.4-1l7.4,0.6c0-1.2-0.1-2.8-0.2-4.8
		s-0.2-3.5-0.2-4.3c0-1,0.3-1.8,1-2.4c0.7-0.6,1.5-1,2.5-1c2.1,0,3.3,1.7,3.7,5.2c0.1,0.9,0.1,1.9,0.1,3.1l-0.1,2l0,2.2
		c2.9-0.4,4.6-0.6,5-0.6c2.4,0,4,0.1,4.8,0.4c1.4,0.5,2.1,1.6,2.1,3.3c0,1-0.3,1.9-1,2.5S478.7,29,477.7,29z"/>
				<path style={{ animationDelay: `${12 * step}s` }} d="M515.6,61.3c-0.4,0-1.3-0.5-2.4-1.5c-1.1-1-1.8-1.8-2.4-2.6c-2.2,1.2-4.2,2.1-5.9,2.8s-3.1,0.9-4.3,0.9
		c-5.5,0-9.5-1.5-12-4.6c-2.4-2.9-3.6-7.4-3.6-13.4c0-5.7,2-10.5,5.9-14.6c3.9-4,8.6-6,14-6c2,0,4.3,0.5,6.9,1.6
		c3.2,1.3,4.8,2.9,4.8,4.7c0,0.6-0.2,1.2-0.7,1.7c-0.2,0.9-0.4,2.4-0.5,4.4s-0.2,4.7-0.2,7.8c0,2.9,0.2,5.2,0.6,6.9
		c0.2,1,1,3.1,2.2,6.2c0.2,0.4,0.4,1,0.8,1.9l0.2,0.6c0,0.9-0.3,1.7-1,2.3S516.4,61.3,515.6,61.3z M508.3,36.9c0-1,0.1-2.1,0.2-3.3
		c0.1-1.2,0.3-2.4,0.6-3.8c-0.9-0.4-1.6-0.8-2.2-1s-1.1-0.3-1.5-0.3c-3.6,0-6.8,1.5-9.4,4.4c-2.6,3-4,6.4-4,10.2
		c0,3.8,0.7,6.7,2,8.6c1.4,1.9,3.4,2.9,6.1,2.9c2.2,0,4.2-0.4,5.7-1.2c0.8-0.4,2-1.3,3.6-2.7C508.6,44.6,508.3,40,508.3,36.9z"/>
			</g>
		</g>
	</svg>
}

export default Title;