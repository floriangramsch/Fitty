<script lang="ts">
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
  workoutId: number;
  userId: number;
  start: Date;
  end: Date;
};
</script>
