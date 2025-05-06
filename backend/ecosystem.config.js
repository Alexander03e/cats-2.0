module.exports = {
  apps: [
    {
      name: 'backend-cats',
      script: './manage.py',
      args: 'runserver 0.0.0.0:8000',
      instances: 1,
      autorestart: true,
      watch: false,
      max_memory_restart: '1G',
      env: {
        DJANGO_SETTINGS_MODULE: 'core.settings',
        PYTHONUNBUFFERED: '1',
      },
    },
  ],
};
