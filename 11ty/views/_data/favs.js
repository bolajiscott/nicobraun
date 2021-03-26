module.exports = function () {
  let array = [
    "docker",
    "javascript",
    "go",
    "python",
    "bash",
    "powershell",
    "linux",
    "kubernetes",
    "nomand",
    "prometheus",
    "grafana",
    "traefik",
    "haproxy",
    "nginx",
    "sql",
    "graphql",
    "dgraph",
    "fastify"
  ]

  for (var i = array.length - 1; i > 0; i--) {
    var j = Math.floor(Math.random() * (i + 1));
    var temp = array[i];
    array[i] = array[j];
    array[j] = temp;
  }

  return array

}
