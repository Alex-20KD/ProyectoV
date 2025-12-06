<template>
  <div class="admin-container">
    <h1>Panel de Administración</h1>
    <p>Aquí podrás monitorear la actividad de la página, gestionar usuarios y mascotas.</p>

    <div class="metrics">
      <div class="metric-card">
        <h2>Usuarios Registrados</h2>
        <p>150</p>
      </div>
      <div class="metric-card">
        <h2>Mascotas en Adopción</h2>
        <p>25</p>
      </div>
      <div class="metric-card">
        <h2>Adopciones Completadas</h2>
        <p>75</p>
      </div>
    </div>
  </div>
</template>

<style scoped>
.admin-container {
  padding: 2rem;
}

.metrics {
  display: flex;
  gap: 1rem;
  margin-top: 2rem;
}

.metric-card {
  padding: 1.5rem;
  border: 1px solid #ccc;
  border-radius: 8px;
  text-align: center;
  flex: 1;
}

.metric-card h2 {
  font-size: 1.2rem;
  margin-bottom: 0.5rem;
}

.metric-card p {
  font-size: 2rem;
  font-weight: bold;
}
</style>
