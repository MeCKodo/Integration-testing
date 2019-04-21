class AccountService {
  getCurrentAccount(data: any) {
    return { data, id: 'account' };
  }
  isPermission() {
    return true;
  }
}

export { AccountService };
