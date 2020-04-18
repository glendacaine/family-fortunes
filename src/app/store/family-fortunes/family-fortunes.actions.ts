export class QuestionsGetAll {
  static readonly type = '[Questions] Get All';
}

export class QuestionsGetAllSuccess {
  static readonly type = '[Questions] Get All Success';
  constructor(public readonly questions: any) { }
}
