export class User {
  email: string;
  password: string;
  avatar: string;

  constructor(item) {
    console.log(item);
    item.kek = 'kek';
    Object.assign(this, item);
  }


}
