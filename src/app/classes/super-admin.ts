export class SuperAdmin {
  constructor(
    Adminid: number,
    AdminName: string,
    AdminImage: string,
    PhoneNo: string,
    Email: string,
    Password: string,
    OldPassword: string,
    PasswordUpdatedOn: Date,
    CreatedOn: Date
  ) {}

  getSuperAdmin() {
    return this;
  }
}
