export default class Routes {
  static lessons = "/lesson";
  static home = "/";
  static login = "/login";
  static signup = "/signup";
  static forgotPassword = "/update-password";
  static updatePassword = "/update-password";
  static about = "/about";
  static contact = "/contact";
  static dashboard = "/dashboard";
  static typingSpeedTest = "/typing-speed-test";
  static typingPractice = "/typing-practice";
  static toLesson(id: string) {
    return `/lesson/${id}`;
  }
  static lessonResult(id: string) {
    return `/lesson/${id}/result`;
  }
  static toTypingSpeedTest(id: string) {
    return `/typing-speed-test/${id}`;
  }
  static typingSpeedTestResult(id: string) {
    return `/typing-speed-test/${id}/result`;
  }
  static toTypingPractice(id: string) {
    return `/typing-practice/${id}`;
  }
  static typingPracticeResult(id: string) {
    return `/typing-practice/${id}/result`;
  }
}
