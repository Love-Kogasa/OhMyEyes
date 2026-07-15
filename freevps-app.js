class Linux {
  PS1 = "browser@localhost: ~# "
  cmds = {
    echo: (self, args) => {
      this.term.innerHTML += args.join(" ") + "<br>"
    },
    sh: (self, args) => {
      if(args.join("").trim() !== "") {
        this.term.innerHTML += "sh: " + args.join(" ") + ": No such file or directory<br>"
      }
    },
    whoami: (self, args) => {
      this.term.innerHTML += "browser<br>"
    },
    whereami: () => {
      this.term.innerHTML += "localhost(127.0.0.1)<br>"
    },
    help: () => {
      this.term.innerHTML += "Web Shell Help Application:<br>"
      this.term.innerHTML += "Support Command: sh echo whoami whereami help date pwd lookup-ssh<br>"
    },
    date: () => {
      this.term.innerHTML += new Date() + "<br>"
    },
    "lookup-ssh": () => {
      this.term.innerHTML += [
        "Ssh Server Data:",
        "Status: <font color=\"green\">Alive</font>",
        "Ip: 127.0.0.1",
        "User: Anonymous",
        "Password: <font color=\"dark\">Empty</font>",
        ""
      ].join("<br>")
    },
    pwd: (self, args) => {
      if(args[0] === "--help") {
        this.term.innerHTML +=
`pwd: pwd [-LP]
    Print the name of the current working directory.

    Options:
      -L        print the value of $PWD if it names the current working
                directory
      -P        print the physical directory, without any symbolic links

    By default, \`pwd' behaves as if \`-L' were specified.

    Exit Status:
    Returns 0 unless an invalid option is given or the current directory
    cannot be read.<br>`
      } else {
        this.term.innerHTML += "/tmp/browser<br>"
      }
    },
    noc: (self) => {
      if(self) {
        this.term.innerHTML += "sh: " + self + ": not found<br>"
      }
    }
  }
  constructor(ele) {
    this.term = ele
    this.term.oninput = () => this.input()
  }
  input() {
    var value = this.term.innerHTML.replaceAll("<div><br></div>", "<br>")
    var lines = value.split("<br>")
    var end = lines[lines.length - 1]
    var latest = lines[lines.length - 2]
    if(end.trim() === "") {
      var [cmd, ...args] = latest.replace(this.PS1, "").trim().split(" ");
      (this.cmds[cmd] || this.cmds.noc)(cmd, args)
      this.term.innerHTML = (this.term.innerHTML + this.PS1).replaceAll("<div><br></div>", "<br>")
    } else if(!end.includes(this.PS1)) {
      this.term.innerHTML = lines.slice(0, -1).concat(this.PS1).join("<br>")
    }
  }
}