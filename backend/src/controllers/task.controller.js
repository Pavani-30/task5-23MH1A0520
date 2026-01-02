const db = require('../config/db');

exports.createTask = async (req, res) => {
  const { title, description, priority, assignedTo, dueDate } = req.body;

  const task = await db.query(
    `INSERT INTO tasks
     (project_id,tenant_id,title,description,priority,assigned_to,due_date)
     VALUES ($1,$2,$3,$4,$5,$6,$7)
     RETURNING *`,
    [
      req.params.projectId,
      req.user.tenantId,
      title,
      description,
      priority,
      assignedTo,
      dueDate
    ]
  );

  res.status(201).json({ success: true, data: task.rows[0] });
};

exports.listTasks = async (req, res) => {
  const tasks = await db.query(
    `SELECT t.*, u.full_name AS assigned_name, u.email
     FROM tasks t
     LEFT JOIN users u ON t.assigned_to=u.id
     WHERE t.project_id=$1 AND t.tenant_id=$2
     ORDER BY priority DESC, due_date ASC`,
    [req.params.projectId, req.user.tenantId]
  );

  res.json({ success: true, data: tasks.rows });
};

exports.updateTaskStatus = async (req, res) => {
  const { status } = req.body;

  const task = await db.query(
    `UPDATE tasks SET status=$1, updated_at=CURRENT_TIMESTAMP
     WHERE id=$2 AND tenant_id=$3
     RETURNING id,status,updated_at`,
    [status, req.params.taskId, req.user.tenantId]
  );

  res.json({ success: true, data: task.rows[0] });
};

exports.updateTask = async (req, res) => {
  const { title, description, status, priority, assignedTo, dueDate } = req.body;

  const task = await db.query(
    `UPDATE tasks SET
      title=COALESCE($1,title),
      description=COALESCE($2,description),
      status=COALESCE($3,status),
      priority=COALESCE($4,priority),
      assigned_to=$5,
      due_date=$6,
      updated_at=CURRENT_TIMESTAMP
     WHERE id=$7 AND tenant_id=$8
     RETURNING *`,
    [title, description, status, priority, assignedTo, dueDate, req.params.taskId, req.user.tenantId]
  );

  res.json({ success: true, data: task.rows[0] });
};
