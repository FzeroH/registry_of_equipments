import instance from './config/axios.config';

class EquipmentService {

    /*Регистрация и авторизация */
    static registration = (login, password) => new Promise((resolve, reject) => {
        instance.post('/registration', { login, password })
        .then(res => resolve(res.data))
        .catch(e => reject(e))
    })
    static login = (login, password) => new Promise((resolve, reject) => {
        instance.post('/login', { login, password })
        .then(res => resolve(res.data))
        .catch(e => reject(e))
    })

    /* Получить данные */
    static getEquipmentList = (order, sort) => new Promise((resolve, reject) => {
        instance.get('/equipments', { params: {
            order, 
            sort
        } })
        .then(res => resolve(res.data))
        .catch(e => reject(e))
    })

    static getEquipmentStatusList = () => new Promise((resolve, reject) => {
        instance.get('/status')
        .then(res => resolve(res.data))
        .catch(e => reject(e))
    })

    static getEquipmentTypeList = () => new Promise((resolve, reject) => {
        instance.get('/types')
        .then(res => resolve(res.data))
        .catch(e => reject(e))
    })

    static getEquipmentResponsibleList = () => new Promise((resolve, reject) => {
        instance.get('/responsible')
        .then(res => resolve(res.data))
        .catch(e => reject(e))
    })

    static getDivisionList = () => new Promise((resolve, reject) => {
        instance.get('/division')
        .then(res => resolve(res.data))
        .catch(e => reject(e))
    })

    /* Добавить данные */
    static addEquipment = (equipment_type_id, equipment_status_id, equipment_responsible_id, equipment_name, inventory_number, user_id) => new Promise((resolve, reject) => {
        instance.post('/equipments', { equipment_type_id, equipment_status_id, equipment_responsible_id, equipment_name, inventory_number, user_id })
        .then(res => resolve(res.data))
        .catch(e => reject(e))
    })

    static addEquipmentStatus = (equipment_status_name) => new Promise((resolve, reject) => {
        instance.post('/status', { equipment_status_name })
        .then(res => resolve(res.data))
        .catch(e => reject(e))
    })

    static addEquipmentType = (equipment_type_name) => new Promise((resolve, reject) => {
        instance.post('/types', { equipment_type_name })
        .then(res => resolve(res.data))
        .catch(e => reject(e))
    })

    static addEquipmentResponsible = (division_id, equipment_responsible_f_name, equipment_responsible_s_name, equipment_responsible_l_name, equipment_responsible_position) => new Promise((resolve, reject) => {
        instance.post('/responsible', { division_id, equipment_responsible_f_name, equipment_responsible_s_name, equipment_responsible_l_name, equipment_responsible_position })
        .then(res => resolve(res.data))
        .catch(e => reject(e))
    })

    static addDivision = (division_name) => new Promise((resolve, reject) => {
        instance.post('/division', { division_name })
        .then(res => resolve(res.data))
        .catch(e => reject(e))
    })

    /* Обновить данные */
    static updateEquipment = (equipment_id, equipment_type_id, equipment_status_id, equipment_responsible_id, equipment_name, inventory_number) => new Promise((resolve, reject) => {
        instance.put('/equipments', { equipment_id, equipment_type_id, equipment_status_id, equipment_responsible_id, equipment_name, inventory_number })
        .then(res => resolve(res.data))
        .catch(e => reject(e))
    })

    static updateEquipmentStatus = (equipment_status_id, equipment_status_name) => new Promise((resolve, reject) => {
        instance.put('/status', { equipment_status_id, equipment_status_name })
        .then(res => resolve(res.data))
        .catch(e => reject(e))
    })

    static updateEquipmentType = (equipment_type_id, equipment_type_name) => new Promise((resolve, reject) => {
        instance.put('/types', { equipment_type_id, equipment_type_name })
        .then(res => resolve(res.data))
        .catch(e => reject(e))
    })

    static updateEquipmentResponsible = (equipment_responsible_id, division_id, equipment_responsible_f_name, equipment_responsible_s_name, equipment_responsible_l_name, equipment_responsible_position) => new Promise((resolve, reject) => {
        instance.put('/responsible', { equipment_responsible_id, division_id, equipment_responsible_f_name, equipment_responsible_s_name, equipment_responsible_l_name, equipment_responsible_position })
        .then(res => resolve(res.data))
        .catch(e => reject(e))
    })

    static updateDivision = (division_id, division_name) => new Promise((resolve, reject) => {
        instance.put('/division', { division_id, division_name })
        .then(res => resolve(res.data))
        .catch(e => reject(e))
    })

    
}


export default EquipmentService