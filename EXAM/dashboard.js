
    async function fetchUsers() {
    try {
      const response = await fetch("https://api.github.com/users");
      if (!response.ok) throw new Error("Failed to fetch users");
      const users = await response.json();
      const topUsers = users.slice(0, 10);
      displayUsers(topUsers);
    } catch (error) {
      console.error("Error fetching GitHub users:", error);
    }
  }
  
  function displayUsers(users) {
    const userList = document.getElementById("userList");
    userList.innerHTML = ""; 
    users.forEach(user => {
      const listItem = document.createElement("li");
      listItem.classList.add("user-item");
  
      const link = document.createElement("a");
      link.href = user.html_url;
      link.textContent = user.login;
      link.target = "_blank"; 
  
      listItem.appendChild(link);
      userList.appendChild(listItem);
    });
  }
  
  function sortUsersAlphabetically(users) {
    return users.sort((a, b) => a.login.localeCompare(b.login));
  }
  
  document.getElementById("sortOptions").addEventListener("change", async (event) => {
    const userList = document.getElementById("userList");
  
    if (userList.children.length === 0) {
      await fetchUsers();
    }
  
    let users = Array.from(userList.children).map(item => ({
      login: item.textContent,
      html_url: item.firstElementChild.href
    }));
  
    if (event.target.value === "alphabetical") {
      users = sortUsersAlphabetically(users);
    }
  
    displayUsers(users);
  });
  