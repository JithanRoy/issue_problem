document.getElementById('issueInputForm').addEventListener('submit', submitIssue);

function submitIssue(e) {
  const getInputValue = id => document.getElementById(id).value;
  const description = getInputValue('issueDescription');
  const severity = getInputValue('issueSeverity');
  const assignedTo = getInputValue('issueAssignedTo');
  const id = Math.floor(Math.random()*100000000) + '';
  let status = 'open';

  const issue = { id, description, severity, assignedTo, status };
  let issues = [];
  if (localStorage.getItem('issues')){
    issues = JSON.parse(localStorage.getItem('issues'));
  }
  issues.push(issue);
  localStorage.setItem('issues', JSON.stringify(issues));

  document.getElementById('issueInputForm').reset();
  totalIssues();
  totalOpenissues();
  fetchIssues();
  e.preventDefault();
}

const totalIssues = () => {
  const issues = JSON.parse(localStorage.getItem('issues'));
  document.getElementById('total-issue').innerText = issues.length;
}

totalIssues();
const totalOpenissues = () => {
  const issues = JSON.parse(localStorage.getItem('issues'));
  let openIssue = 0;
  issues.forEach(element => {
    if(element.status == 'open') {
          element.status == 'open';
          openIssue++;
    }
  });
  document.getElementById('total-open-issue').innerText = openIssue;
}

totalOpenissues();

const setStatusClosed = (event, id) => {

  event.preventDefault();
  const issues = JSON.parse(localStorage.getItem('issues'));
 
  for (let i = 0; i < issues.length; i++) {
    const element = issues[i];
    if(element.id == id) {
      issues[i].status = 'closed';
      localStorage.setItem('issues', JSON.stringify(issues));
      fetchIssues();
      totalOpenissues();
    }
  } 
  document.getElementById(`updateDescription-${id}`).style.textDecoration = 'line-through';
}



const deleteIssue = (event, id) => {
  event.preventDefault();
  const issues = JSON.parse(localStorage.getItem('issues'));

  const remainingIssues = issues.filter(issue => issue.id != id);
  document.getElementById(`issueFormat-${id}`).style.display = 'none';
  
  localStorage.setItem('issues', JSON.stringify(remainingIssues));
  fetchIssues();
  totalIssues();
}



const fetchIssues = () => {
  const issues = JSON.parse(localStorage.getItem('issues'));
  const issuesList = document.getElementById('issuesList');
  issuesList.innerHTML = '';

  for (var i = 0; i < issues.length; i++) {
    const {id, description, severity, assignedTo, status} = issues[i];

    issuesList.innerHTML +=   `<div id="issueFormat-${id}" class="well">
                              <h6>Issue ID: ${id} </h6>
                              <p><span class="label label-info" id="statusCheck" > ${status} </span></p>
                              <h3 id="updateDescription-${id}"> ${description} </h3>
                              <p><span class="glyphicon glyphicon-time"></span> ${severity}</p>
                              <p><span class="glyphicon glyphicon-user"></span> ${assignedTo}</p>
                              <a href="#" onclick="setStatusClosed(event,${id})" class="btn btn-warning">close</a>
                              <a href="#" onclick="deleteIssue(event, ${id})" class="btn btn-danger">Delete</a>
                              </div>`;
  }
}
