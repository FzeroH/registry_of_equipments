export const checkIsAdmin = () => localStorage.getItem('role_id') === '1';
export const checkIsEmployee  = () => localStorage.getItem('role_id') === '2';
export const checkIsEquipmentResponsible   = () => localStorage.getItem('role_id') === '3';