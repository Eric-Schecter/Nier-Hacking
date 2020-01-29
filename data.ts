// import { RommType } from './types';
const rooms = [{
  title: '病例事项',
  type: 'issue',
  dialog: [],
  unread:0,
  current:false,
}, {
  title: '阶段进度',
  type: 'stage',
  dialog: [],
  unread:0,
  current:false,
},{
  title: '每日报告',
  type: 'report',
  dialog: [],
  unread:0,
  current:false,
}, {
  title: '系统警报',
  type: 'alarm',
  dialog: [],
  unread:0,
  current:false,
}];

export default rooms;