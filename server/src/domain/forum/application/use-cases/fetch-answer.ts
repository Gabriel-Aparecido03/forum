import { Injectable } from "@nestjs/common";
import { AnswerRepository } from "../repositories/answer-repository";

interface FetchAnswerParams {
  topicId : string
}

@Injectable()
export class FetchAnswersUseCase {
  constructor(private answersRepository: AnswerRepository) { }

  async execute({  topicId }: FetchAnswerParams) {
    const answers = await this.answersRepository.fetchAnswer({ topicId })

    return { answers }
  }
}