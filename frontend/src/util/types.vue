<script lang="ts">
export type Logged = {
  isLogged: boolean;
  user: UserType | undefined;
  workout: WorkoutType | undefined;
};

export type UserType = {
  user_id: number;
  name: string;
};

export type MuscleType = {
  muscle_group_id: number;
  name: string;
};

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
