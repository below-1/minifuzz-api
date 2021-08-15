import { Injectable } from '@nestjs/common';
import { Question } from './Question';

const questions = [
  {
    question: `Jumlah bermain (matchmaking) pada online game dalam sehari`,
    answers: [
      'sedikit',
      'lumayan',
      'banyak'
    ]
  },
  {
    question: `Durasi peningkatan waktu bermain online game sekarang dibandingkan dahulu`,
    answers: [
      'cepat',
      'standar',
      'lama'
    ]
  },
  {
    question: `Keseringan bermain online game sebagai pelarian dari masalah kehidupan`,
    answers: [
      'jarang',
      'cukup',
      'sering'
    ]
  },
  {
    question: `Tingkat amarah meningkat atau tidak senang apabila disuruh berhenti bermain online game`,
    answers: [
      'rendah',
      'sedang',
      'tinggi'
    ]
  },
  {
    question: `Tingkat keinginan bermain ulang online game lebih lama setelah sebelumnya berhenti dikarenakan aktivitas lain`,
    answers: [
      'cepat',
      'standar',
      'lama'
    ]
  },
  {
    question: `Tingkat kesadaran apabila sering bermain online game membawa dampak buruk bagi kehidupan pribadi`,
    answers: [
      'rendah',
      'sedang',
      'tinggi'
    ]
  },
  {
    question: `Keseringan menunda pekerjaan karena bermain online game`,
    answers: [
      'jarang',
      'cukup',
      'sering'
    ]
  },
  {
    question: `Jumlah biaya yang dikeluarkan untuk kebutuhan dari bermain online game`,
    answers: [
      'sedikit',
      'lumayan',
      'banyak'
    ]
  }
]

const answers: String[] = [
  'Tidak Memiliki Perilaku Kecanduan',
  'Salience',
  'Euphoria',
  'Tolerance',
  'Withdrawal',
  'Relapse and Reinstatement',
  'Conflict'
]

@Injectable()
export class QuestionService {
  getData() {
    return {
      questions,
      answers
    };
  }
}
