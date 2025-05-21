
export interface Representative {
  id: number;
  name: string;
  role: string;
  district: string;
  party: string;
  tasksTotal: number;
  tasksCompleted: number;
  rating: number;
}

export const mockRepresentatives: Representative[] = [
  { 
    id: 1, 
    name: "Иванов Иван Иванович", 
    role: "Депутат городской думы", 
    district: "Округ №1", 
    party: "Единая Россия",
    tasksTotal: 15,
    tasksCompleted: 8,
    rating: 4.7
  },
  { 
    id: 2, 
    name: "Петрова Мария Сергеевна", 
    role: "Глава района", 
    district: "Центральный район", 
    party: "Справедливая Россия",
    tasksTotal: 12,
    tasksCompleted: 10,
    rating: 4.9
  },
  { 
    id: 3, 
    name: "Сидоров Алексей Петрович", 
    role: "Депутат городской думы", 
    district: "Округ №3", 
    party: "КПРФ",
    tasksTotal: 18,
    tasksCompleted: 7,
    rating: 4.3
  },
  { 
    id: 4, 
    name: "Козлова Екатерина Андреевна", 
    role: "Депутат городской думы", 
    district: "Округ №2", 
    party: "ЛДПР",
    tasksTotal: 10,
    tasksCompleted: 6,
    rating: 4.5
  },
  { 
    id: 5, 
    name: "Васильев Дмитрий Николаевич", 
    role: "Глава района", 
    district: "Промышленный район", 
    party: "Единая Россия",
    tasksTotal: 20,
    tasksCompleted: 15,
    rating: 4.8
  },
  { 
    id: 6, 
    name: "Смирнова Анна Викторовна", 
    role: "Депутат городской думы", 
    district: "Округ №4", 
    party: "Новые люди",
    tasksTotal: 8,
    tasksCompleted: 5,
    rating: 4.6
  },
];
