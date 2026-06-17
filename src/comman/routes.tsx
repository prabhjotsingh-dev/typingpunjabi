export default class Routes {
  static lessons = "/lesson";
  static home = "/";
  static login = "/login";
  static signup = "/signup";
  static forgetPassword = "/update-password";
  static updatePassword = "/update-password";
  static about = "/about";
  static contact = "/contact";
  static dashboard = "/dashboard";
  static toLesson(id: string) {
    return `/lesson/${id}`;
  }
  static lessonResult(id: string) {
    return `/lesson/${id}/result`;
  }
  static nextLesson(id: string) {
    return `/lesson/${id}/nextlesson`;
  }
}
