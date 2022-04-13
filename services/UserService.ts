class UserService {
  users = [
    { login: "marm210", password: "ndl", nickName: "Mariam" },
    { login: "gege11", password: "ami", nickName: "Gersende" },
  ];

  authenticate(login: string, password: string) {
    return (
      // Search for the first user matching login and password
      this.users.find((u) => u.login === login && u.password === password) ||
      null
    );
  }
}

export default new UserService();
