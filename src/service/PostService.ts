class PostService {
  getPost(data: any) {
    return { data, id: 'post' };
  }
  isPermission(arg, xx) {
    console.log(arg, xx, '-post service isPermission');
  }
  isPost() {
    return true;
  }
}

export { PostService };
