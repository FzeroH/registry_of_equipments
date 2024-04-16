import instance from './config/axios.config';

class EquipmentService {
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
    static addEquipment = (equipment_type_id, equipment_status_id, equipment_responsible_id, equipment_name, inventory_number) => new Promise((resolve, reject) => {
        instance.post('/equipments', { equipment_type_id, equipment_status_id, equipment_responsible_id, equipment_name, inventory_number })
        .then(res => resolve(res.data))
        .catch(e => reject(e))
    })

    static addEquipmentStatusList = () => new Promise((resolve, reject) => {
        instance.post('/status')
        .then(res => resolve(res.data))
        .catch(e => reject(e))
    })

    static addEquipmentTypeList = () => new Promise((resolve, reject) => {
        instance.post('/types')
        .then(res => resolve(res.data))
        .catch(e => reject(e))
    })

    static addEquipmentResponsibleList = () => new Promise((resolve, reject) => {
        instance.post('/responsible')
        .then(res => resolve(res.data))
        .catch(e => reject(e))
    })

    static addDivisionList = () => new Promise((resolve, reject) => {
        instance.post('/division')
        .then(res => resolve(res.data))
        .catch(e => reject(e))
    })

    /* Обновить данные */
    static updateEquipment = (equipment_id, equipment_type_id, equipment_status_id, equipment_responsible_id, equipment_name, inventory_number) => new Promise((resolve, reject) => {
        instance.put('/equipments', { equipment_id, equipment_type_id, equipment_status_id, equipment_responsible_id, equipment_name, inventory_number })
        .then(res => resolve(res.data))
        .catch(e => reject(e))
    })

    static updateEquipmentStatusList = () => new Promise((resolve, reject) => {
        instance.put('/status')
        .then(res => resolve(res.data))
        .catch(e => reject(e))
    })

    static updateEquipmentTypeList = () => new Promise((resolve, reject) => {
        instance.put('/types')
        .then(res => resolve(res.data))
        .catch(e => reject(e))
    })

    static updateEquipmentResponsibleList = () => new Promise((resolve, reject) => {
        instance.put('/responsible')
        .then(res => resolve(res.data))
        .catch(e => reject(e))
    })

    static updateDivisionList = () => new Promise((resolve, reject) => {
        instance.put('/division')
        .then(res => resolve(res.data))
        .catch(e => reject(e))
    })

    
}


export default EquipmentService