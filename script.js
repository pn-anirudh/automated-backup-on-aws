document.getElementById('backup-button').addEventListener('click', () => {
    // Add code here to trigger the backup process
    alert('Backup initiated!');
    const newTab = window.open('https://gl3rsp7mind5bdftflhzjzxyze0nnxgd.lambda-url.us-east-1.on.aws/', '_blank');
});
document.getElementById('backuprds-button').addEventListener('click', () => {
    // Add code here to trigger the backup process
    alert('Backup initiated!');
    const newTab = window.open('https://7qunzjqgbn5rkntyovoljluo4m0rflgz.lambda-url.us-east-1.on.aws/', '_blank');
});
document.getElementById('but1ton').addEventListener('click', () => {
    // Add code here to trigger the backup process
    const newTab = window.open('https://us-east-1.console.aws.amazon.com/events/home?region=us-east-1#/eventbus/default/rules/EBS-Sheduled-Backup', '_blank');
});
document.getElementById('but2ton').addEventListener('click', () => {
    // Add code here to trigger the backup process
    const newTab = window.open('https://us-east-1.console.aws.amazon.com/events/home?region=us-east-1#/eventbus/default/rules/RDS-Sheduled-Backup', '_blank');
});
function fetchFirstTableData() {
    fetch('fetch-data.php')
        .then(response => response.json())
        .then(data => {
		
            const table1 = document.getElementById('table1');
	
            table1.innerHTML = `<thead>
                <tr>
                    <th>Snapshot ID</th>
                    <th>Volume ID</th>
                    <th>Instance ID</th>
                    <th>Delete On</th>
                    <th>Current Date Time</th>
                </tr>
            </thead>`; // Clear existing data
            data.forEach(row => {
                const tr = document.createElement('tr');
                tr.innerHTML = `
                    <td>${row.SnapshotId}</td>
                    <td>${row.VolumeId}</td>
                    <td>${row.InstanceId}</td>
                    <td>${row.DeleteOn}</td>
                    <td>${row.CurrentDateTime}</td>
                `;
                table1.appendChild(tr);
            });
        })
        .catch(error => console.error(error));
}

function fetchSecondTableData() {
    fetch('fetch-s3-metadata.php')
        .then(response => response.json())
        .then(data => {
            const table2 = document.getElementById('table2');
            table2.innerHTML = `<thead>
                <tr>
                    <th>Bucket</th>
                    <th>EventTime</th>
                    <th>Object</th>
                    <th>ObjectURL</th>
                </tr>
            </thead>`; // Clear existing data
            data.forEach(row => {
                const tr = document.createElement('tr');
                tr.innerHTML = `
                    <td>${row.Bucket}</td>
                    <td>${row.EventTime}</td>
                    <td>${row.Object}</td>
                    <td>${row.ObjectURL}</td>
                `;
                table2.appendChild(tr);
            });
        })
        .catch(error => console.error(error));
}

fetchFirstTableData();

const switchTableButton = document.getElementById('switch-table-button');
switchTableButton.addEventListener('click', () => {
    const table1 = document.getElementById('table1');
    const table2 = document.getElementById('table2');

    if (table1.style.display === 'none') {
        table1.style.display = 'table';
        table2.style.display = 'none';
        fetchFirstTableData();
        switchTableButton.textContent = 'Switch to S3 View';
    } else {
        table1.style.display = 'none';
        table2.style.display = 'table';
        fetchSecondTableData();
        switchTableButton.textContent = 'Switch to Instance Snapshot View';
    }
});
