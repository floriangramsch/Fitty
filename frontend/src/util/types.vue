<script lang="ts">
export type LoggedType = {
  isLogged: boolean;
  user: UserType | undefined;
  workout: WorkoutType | undefined;
};

export type UserType = {
  user_id: number;
  name: string;
};

// export type MuscleType = {
//   muscle_group_id: number;
//   name: string;
// };
export type MuscleType = {
  [id: number]: {
    muscle_name: string;
  };
};

export type AllType = {
  equips: EquipType,
  users: UserType,
  muscles: MuscleType,
  workouts: WorkoutType,
}


export type EquipType = {
  id: number;
  name: string;
  muscle: string;
};

export type WorkoutType = {
  workout_id: number;
  user_id: number;
  start: Date;
  end: Date;
};
</script>
