module.exports = function () {
  let array = [
    "docker",
    "terraform",
    "ansible",
    "prometheus",
    "grafana",
    "nomad",
    "consul",
    "kubernetes",
    "javascript",
    "go",
    "python"
  ]

  for (var i = array.length - 1; i > 0; i--) {
    var j = Math.floor(Math.random() * (i + 1));
    var temp = array[i];
    array[i] = array[j];
    array[j] = temp;
  }

  return array

}
