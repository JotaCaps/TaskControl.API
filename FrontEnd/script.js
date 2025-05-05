// --- Funções de Utilidade (Gerais) ---

function hideAllForms() {
    document.getElementById('CreateTaskForm').style.display = 'none';
    document.getElementById('updateTaskForm').style.display = 'none';
    document.getElementById('deleteTaskForm').style.display = 'none';
    document.getElementById('getTaskForm').style.display = 'none';
    document.getElementById('getAllTaskForm').style.display = 'none';
    document.getElementById('filterTasksForm').style.display = 'none';
}

function showFeedbackMessage(message, type, elementId = 'feedback') {
    const feedbackElement = document.getElementById(elementId);
    
    if (!feedbackElement) {
        console.error(`Elemento de feedback com ID "${elementId}" não encontrado.`);
        return;
    }

    feedbackElement.textContent = message;

    if (type === 'success') {
        feedbackElement.style.backgroundColor = 'green';
        feedbackElement.style.color = 'white';
    } else if (type === 'error') {
        feedbackElement.style.backgroundColor = 'red';
        feedbackElement.style.color = 'white';
    } else {
        feedbackElement.style.backgroundColor = 'gray';
        feedbackElement.style.color = 'white';
    }

    feedbackElement.style.display = 'block';

    setTimeout(() => {
        feedbackElement.style.display = 'none';
    }, 5000);
}

// --- Event Listeners para Exibir Formulários ---

document.getElementById('createBtn').addEventListener('click', function() {
    hideAllForms();
    document.getElementById('CreateTaskForm').style.display = 'block';
});

document.getElementById('updateBtn').addEventListener('click', function() {
    hideAllForms();
    document.getElementById('updateTaskForm').style.display = 'block';
});

document.getElementById('deleteBtn').addEventListener('click', function() {
    hideAllForms();
    document.getElementById('deleteTaskForm').style.display = 'block';
});

document.getElementById('getBtn').addEventListener('click', function() {
    hideAllForms();
    document.getElementById('getTaskForm').style.display = 'block';
});

document.getElementById('getAllBtn').addEventListener('click', function() {
    hideAllForms();
    document.getElementById('getAllTaskForm').style.display = 'block';
});

document.getElementById('filterTasksBtn').addEventListener('click', function() {
    hideAllForms();
    document.getElementById('filterTasksForm').style.display = 'block';
});

// --- Event Listeners para Submissão de Formulários e Ações ---

document.getElementById('CreateTaskForm').addEventListener('submit', async function (e) {
    e.preventDefault();

    const formData = new FormData(this);

    const dataCriacao = new Date().toISOString(); 

    const dataConclusaoInput = formData.get('dataDeConclusao');

    if (dataConclusaoInput) {
        const dataConclusao = new Date(dataConclusaoInput);
        const dataCriacaoDate = new Date(dataCriacao);
        if (dataConclusao < dataCriacaoDate) {
            showFeedbackMessage('A data de conclusão não pode ser anterior à data de criação.', 'error', 'createFeedback');
            return;
        }
    }
    

    const taskData = {
        titulo: formData.get('titulo'),
        descricao: formData.get('descricao'),
        dataCriacao,
        status: parseInt(formData.get('status'), 10),
        dataDeConclusao: dataConclusaoInput ? new Date(dataConclusaoInput).toISOString() : null,
    };

    try {
        const response = await fetch('http://localhost:5188/api/tarefas', {
            method: 'POST',
            headers: {
                'Content-Type' : 'application/json'
            },
            body: JSON.stringify(taskData) 
        });

        if (response.ok) {
            const result = await response.json();
            console.log('Tarefa criada com sucesso:', result);
            showFeedbackMessage('Tarefa criada com sucesso!', 'success', 'createFeedback');

            document.getElementById('CreateTaskForm').reset();
        } else {
            const error = await response.json();
            console.error('Erro ao criar tarefa:', error);
            showFeedbackMessage('Erro ao criar tarefa: ' + error.error, 'error', 'createFeedback');
        }
    } catch (error) {
        console.error('Erro na requisição:', error);
        showFeedbackMessage('Erro ao criar tarefa: ' + error.error, 'error', 'createFeedback');
    }
});

document.getElementById('updateTaskForm').addEventListener('submit', async function (e) {
    e.preventDefault();

    const taskId = document.getElementById('updateTaskId').value;
    const formData = new FormData(this);

    let taskData;
    try {
        const response = await fetch(`http://localhost:5188/api/tarefas/${taskId}`);

        if (!response.ok) {
            throw new Error(`Erro ao recuperar tarefa. Status: ${response.status}`);
        }

        try {
            const responseJson = await response.json();
            taskData = responseJson.data;
        } catch (error) {
            throw new Error('Resposta da API não é um JSON válido');
        }
    } catch (error) {
        showFeedbackMessage('Tarefa não encontrada ou erro na requisição!', 'error', 'updateFeedback');
        console.error('Erro ao recuperar tarefa:', error);
        return;
    }

    const dataCriacao = new Date(taskData.dataDeCriacao);
    const dataConclusaoInput = formData.get('updateDataDeConclusao');
    let dataConclusao = null;
    if (dataConclusaoInput) {
        dataConclusao = new Date(dataConclusaoInput);
    }

    console.log('Data de Criação (string):', taskData.dataDeCriacao);
    console.log('Data de Criação (objeto Date):', dataCriacao);
    console.log('Data de Conclusão (objeto Date):', dataConclusao);

    if (dataConclusao && dataConclusao < dataCriacao) {
        console.log('Validação falhou: Data de conclusão é anterior à data de criação.');
        showFeedbackMessage('A data de conclusão não pode ser anterior à data de criação.', 'error', 'updateFeedback');
        return; 
    } else if (dataConclusao) {
        console.log('Validação passou: Data de conclusão é válida.');
    } else {
        console.log('Campo de data de conclusão está vazio, pulando validação.');
    }

    const taskUpdateData = {
        titulo: formData.get('updateTitulo'),
        descricao: formData.get('updateDescricao'),
        dataDeCriacao: taskData.dataDeCriacao, 
        status: parseInt(formData.get('updateStatus'), 10),
        dataDeConclusao: dataConclusaoInput ? new Date(dataConclusaoInput).toISOString() : null,
    };

    try {
        const updateResponse = await fetch(`http://localhost:5188/api/tarefas/${taskId}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(taskUpdateData)
        });

        if (updateResponse.ok) {
            showFeedbackMessage('Tarefa atualizada com sucesso!', 'success', 'updateFeedback');
            document.getElementById('updateTaskForm').reset();
        } else {
            const error = await updateResponse.json();
            console.error('Erro ao atualizar tarefa:', error);
            showFeedbackMessage('Erro ao atualizar tarefa: ' + error.error, 'error', 'updateFeedback');
        }
    } catch (error) {
        console.error('Erro na requisição:', error);
        showFeedbackMessage('Erro ao atualizar tarefa', 'error', 'updateFeedback');
    }
});

document.getElementById('deleteTaskForm').addEventListener('submit', async function (e) {
        e.preventDefault();
    

        const taskId = document.getElementById('DeleteTaskId').value;

        try{
            const response = await fetch(`http://localhost:5188/api/tarefas/${taskId}`, {
                method: 'DELETE',
                headers: {
                    'Content-Type': 'application/json'
                }
            });

            if(response.ok) {
                console.log('Tarefa excluída com sucesso');
                showFeedbackMessage('Tarefa excluída com sucesso!', 'success', 'deleteFeedback');
                document.getElementById('deleteTaskForm').reset();
            }else{
                const error = await response.json();
                console.error('Erro ao excluir tarefa:', error);
                showFeedbackMessage('Tarefa não encontrada', 'error', 'deleteFeedback');
            }
        } catch (error) {
            console.error('Erro na requisição:', error);
            showFeedbackMessage('Erro ao excluir tarefa: ' + error.message, 'error', 'deleteFeedback');
        }
    });

document.getElementById('getTaskForm').addEventListener('submit', async function (e) {
        e.preventDefault();
    
        const taskId = document.getElementById('GetTaskById').value;
        const taskDetailsDiv = document.getElementById('taskDetails');
    
        console.log("Botão clicado! ID da tarefa que será buscado:", taskId);
    
        try {
            const response = await fetch(`http://localhost:5188/api/tarefas/${taskId}`, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json'
                }
            });
    
            if (response.ok) {
                const result = await response.json();
                console.log("Resultado da requisição GET:", result);

                    if (result.data) {
                        const task = result.data;
        
                        const statusMap = {
                            0: 'Pendente',
                            1: 'Em Progresso',
                            2: 'Concluído'
                        };
    
                    const formatLocalDate = (dateString) => {
                        if (!dateString) {
                            return '';
                        }
                        let utcDateString = dateString;
                        if (!dateString.endsWith('Z')) {
                            utcDateString = dateString + 'Z';
                        }
                        const localDate = new Date(utcDateString);
                        return localDate.toLocaleString();
                    };
    
                    taskDetailsDiv.innerHTML = `
                        <h3>Detalhes da Tarefa</h3>
                        <p><strong>ID:</strong> ${task.id}</p>
                        <p><strong>Título:</strong> ${task.titulo}</p>
                        <p><strong>Descrição:</strong> ${task.descricao}</p>
                        <p><strong>Data de Criação:</strong> ${formatLocalDate(task.dataDeCriacao)}</p>
                        <p><strong>Status:</strong> ${statusMap[task.status] || 'Desconhecido'}</p>
                        <p><strong>Data de Conclusão:</strong> ${formatLocalDate(task.dataDeConclusao) || 'Não concluída'}</p>
                    `;
                    showFeedbackMessage('', '', 'GetByIdFeedback');
                } else {
                    taskDetailsDiv.innerHTML = '';
                    showFeedbackMessage('Tarefa não encontrada.', 'error', 'GetByIdFeedback');
                }
    
            } else {
                taskDetailsDiv.innerHTML = '';
                showFeedbackMessage('Tarefa não encontrada.', 'error', 'GetByIdFeedback');
                console.error('Erro ao buscar tarefa:', await response.text() || response.statusText);
            }
        } catch (error) {
            console.error('Erro na requisição:', error);
            taskDetailsDiv.innerHTML = '';
            showFeedbackMessage('Erro na requisição: ' + (error.message || JSON.stringify(error) || "Erro desconhecido"), 'error', 'GetByIdFeedback');
        }
    
    });

document.getElementById('getAllBtn').addEventListener('click', async function (e) {
        try {
            const response = await fetch(`http://localhost:5188/api/tarefas/`, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json'
                }
            });

            if (response.ok) {
                const result = await response.json();  
                console.log("Resultado da requisição GET ALL:", result);


                if (result.data && Array.isArray(result.data)) {
                    const tasks = result.data;

                    const statusMap = {
                        0: 'Pendente',
                        1: 'Em Progresso',
                        2: 'Concluído'
                    };

                    let tasksHtml = "<h3>Lista de Tarefas:</h3>";
                    tasks.forEach(task => {
                        tasksHtml += `
                            <div class="task-item">
                            <p><strong>ID:</strong> ${task.id}</p>
                            <p><strong>Título:</strong> ${task.titulo}</p>
                            <p><strong>Status:</strong> ${statusMap[task.status] || 'Desconhecido'}</p>
                        </div>
                    `;
                    });

                document.getElementById('AllTasksDetails').innerHTML = tasksHtml;
                } else {
                    alert("Nenhuma tarefa encontrada.");
                }
                } else {
                const error = await response.text();
                console.error('Erro ao listar tarefas:', error || response.statusText);
                alert('Erro ao listar tarefas: ' + (error || response.statusText));
                }
            } catch (error) {
            console.error('Erro na requisição:', error);
            alert('Erro na requisição: ' + (error.message || "Erro desconhecido"));
            } 
});

document.getElementById('filterBtn').addEventListener('click', async function () {
    const status = document.getElementById('statusFilter').value;
    const tasksListDiv = document.getElementById('tasksList');

    try {
        let url = 'http://localhost:5188/api/tarefas';
        if (status) {
            url = `http://localhost:5188/api/tarefas/status/${status}`;
        }

        const response = await fetch(url, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json'
            }
        });

        if (response.ok) {
            const result = await response.json();
            console.log('Tarefas filtradas:', result);

            if (result && result.data && Array.isArray(result.data)) {
                const tasks = result.data;

                const statusMap = {
                    0: 'Pendente',
                    1: 'Em Progresso',
                    2: 'Concluído'
                };

                let tasksHtml = '<h3>Tarefas Filtradas:</h3>';
                tasks.forEach(task => {
                    let statusText = statusMap[task.status] || 'Desconhecido';
                    tasksHtml += `
                        <div class="task-item">
                            <p><strong>ID:</strong> ${task.id}</p>
                            <p><strong>Título:</strong> ${task.titulo}</p>
                            <p><strong>Status:</strong> ${statusText}</p>
                        </div>
                    `;
                });
                tasksListDiv.innerHTML = tasksHtml;
            } else {
                tasksListDiv.innerHTML = '<p>Nenhuma tarefa encontrada.</p>';
            }
        } else {
            const error = await response.text();
            console.error('Erro ao filtrar tarefas:', error || response.statusText);
            tasksListDiv.innerHTML = `<p>Erro ao filtrar tarefas: ${error || response.statusText}</p>`;
        }
    } catch (error) {
        console.error('Erro na requisição:', error);
        tasksListDiv.innerHTML = `<p>Erro na requisição: ${error.message || 'Erro desconhecido'}</p>`;
    }
});