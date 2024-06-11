import instance from "./config/axios.config";

class EquipmentService {
  /*Регистрация и авторизация */
  static registration = (
    role_id,
    division_id,
    login,
    password,
    first_name,
    last_name,
    middle_name
  ) =>
    new Promise((resolve, reject) => {
      instance()
        .post("/registration", {
          role_id,
          division_id,
          login,
          password,
          first_name,
          last_name,
          middle_name,
        })
        .then((res) => resolve(res.data))
        .catch((e) => reject(e));
    });
  static login = (login, password) =>
    new Promise((resolve, reject) => {
      instance()
        .post("/login", { login, password })
        .then((res) => resolve(res.data))
        .catch((e) => reject(e));
    });

  /* Получить данные */
  static getEquipmentList = (order, sort, search) =>
    new Promise((resolve, reject) => {
      instance()
        .get("/equipments", {
          params: {
            order,
            sort,
            search,
          },
        })
        .then((res) => resolve(res.data))
        .catch((e) => reject(e));
    });

  static getEquipmentStatusList = () =>
    new Promise((resolve, reject) => {
      instance()
        .get("/status")
        .then((res) => resolve(res.data))
        .catch((e) => reject(e));
    });

  static getEquipmentResponsibleList = () =>
    new Promise((resolve, reject) => {
      instance()
        .get("/responsible")
        .then((res) => resolve(res.data))
        .catch((e) => reject(e));
    });

  static getDivisionList = () =>
    new Promise((resolve, reject) => {
      instance()
        .get("/division")
        .then((res) => resolve(res.data))
        .catch((e) => reject(e));
    });
  static getUserList = () =>
    new Promise((resolve, reject) => {
      instance()
        .get("/user")
        .then((res) => resolve(res.data))
        .catch((e) => reject(e));
    });

  /* Добавить данные */
  static addEquipment = (
    equipment_type_id,
    equipment_status_id,
    equipment_responsible_id,
    equipment_name,
    inventory_number,
    user_id
  ) =>
    new Promise((resolve, reject) => {
      instance()
        .post("/equipments", {
          equipment_type_id,
          equipment_status_id,
          equipment_responsible_id,
          equipment_name,
          inventory_number,
          user_id,
        })
        .then((res) => resolve(res.data))
        .catch((e) => reject(e));
    });

  static addEquipmentStatus = (equipment_status_name) =>
    new Promise((resolve, reject) => {
      instance()
        .post("/status", { equipment_status_name })
        .then((res) => resolve(res.data))
        .catch((e) => reject(e));
    });

  static addEquipmentResponsible = (
    division_id,
    equipment_responsible_f_name,
    equipment_responsible_s_name,
    equipment_responsible_l_name,
    equipment_responsible_position
  ) =>
    new Promise((resolve, reject) => {
      instance()
        .post("/responsible", {
          division_id,
          equipment_responsible_f_name,
          equipment_responsible_s_name,
          equipment_responsible_l_name,
          equipment_responsible_position,
        })
        .then((res) => resolve(res.data))
        .catch((e) => reject(e));
    });

  static addDivision = (division_name) =>
    new Promise((resolve, reject) => {
      instance()
        .post("/division", { division_name })
        .then((res) => resolve(res.data))
        .catch((e) => reject(e));
    });

  /* Обновить данные */
  static updateEquipment = (
    equipment_id,
    equipment_type_id,
    equipment_status_id,
    equipment_responsible_id,
    equipment_name,
    inventory_number
  ) =>
    new Promise((resolve, reject) => {
      instance()
        .put("/equipments", {
          equipment_id,
          equipment_type_id,
          equipment_status_id,
          equipment_responsible_id,
          equipment_name,
          inventory_number,
        })
        .then((res) => resolve(res.data))
        .catch((e) => reject(e));
    });

  static updateEquipmentStatus = (equipment_status_id, equipment_status_name) =>
    new Promise((resolve, reject) => {
      instance()
        .put("/status", { equipment_status_id, equipment_status_name })
        .then((res) => resolve(res.data))
        .catch((e) => reject(e));
    });

  static updateUser = (
    user_id,
    role_id,
    division_id,
    login,
    first_name,
    last_name,
    middle_name
  ) =>
    new Promise((resolve, reject) => {
        console.log('afa', {
            user_id,
            role_id,
            division_id,
            login,
            first_name,
            last_name,
            middle_name,
          });
      instance()
        .put("/user", {
          user_id,
          role_id,
          division_id,
          login,
          first_name,
          last_name,
          middle_name,
        })
        .then((res) => resolve(res.data))
        .catch((e) => reject(e));
    });

  static updateDivision = (division_id, division_name) =>
    new Promise((resolve, reject) => {
      instance()
        .put("/division", { division_id, division_name })
        .then((res) => resolve(res.data))
        .catch((e) => reject(e));
    });

    static downloadFile = (search) =>
      new Promise((resolve, reject) => {
        instance()
          .get("/download", { params: { search } })
          .then(() => {
            const url = 'http://localhost:3000'
            const link = document.createElement('a');
            link.setAttribute('href', `${url}/download?search=${search}`);
            link.setAttribute('download', 'test.docx');
            document.body.appendChild(link)
            link.click()
            document.body.removeChild(link)
          })
          .catch((e) => reject(e));
      });
}

export default EquipmentService;
