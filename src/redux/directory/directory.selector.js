import { createSelector } from 'reselect';

const selectDirectory = (state) => state.directory;

export const selectDirectorySections = createSelector([selectDirectory], (directory) => directory.sections);

//========================================
// TODO: なぜ必要？
//
//
//========================================
// state: {
//  directory: {
//    sections: [
//       {
//         title: 'hats',
//         imageUrl: 'https://i.ibb.co/cvpntL1/hats.png',
//         id: 1,
//         linkUrl: 'shop/hats',
//        },
