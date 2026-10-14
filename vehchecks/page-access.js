import {features} from './team-definitions.js';
export const staffRoles=['general_manager','supervisor','lead_controller','controller','junior_controller','scheduler','lead_driver','driver'];
export const pageAccess={
 dashboard:staffRoles.filter(role=>role!=='driver'),
 reports:staffRoles.filter(role=>role!=='driver'),
 staff:['general_manager','supervisor','lead_controller'],
 catalogue:['general_manager','supervisor'],
 permissions:staffRoles,
 checks:staffRoles
};
for(const [key,feature] of Object.entries(features))pageAccess[key]=feature.view;
export function canOpenPage(role,page){return Object.hasOwn(pageAccess,page)&&pageAccess[page].includes(role);}
