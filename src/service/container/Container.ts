class Container {
  classMap = new Map<string, any>();
  registerClass(config: any) {
    this.classMap.set(config.name, { cls: config.value, instance: null });
  }

  get(name: string) {
    const classOpts = this.classMap.get(name);

    if (!classOpts) return;

    if (classOpts.instance) {
      return classOpts.instance;
    }
    classOpts.instance = new classOpts.cls();
    return classOpts.instance;
  }
}

export default new Container();
