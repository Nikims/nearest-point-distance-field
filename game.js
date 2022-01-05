// distancesfromeachtoeach = [];
// for (i = 0; i < points.length; i++) {
//   for (j = 0; j < points.length; j++) {
//     distancesfromeachtoeach.push(
//       (1 /
//         Math.sqrt(
//           Math.pow(points[i].x - points[j].x, 2) +
//             Math.pow(points[i].y - points[j].y, 2)
//         )) *
//         4000
//     );
//   }
// }
const arr = new Uint8ClampedArray(4 * 600 * 600);

// Iterate through every pixel

// Initialize a new ImageData object
let imageData = new ImageData(arr, 600, 600);
class point {
  nearestneighbor = 0;
  minimumdistance = 9999999;
  direction = Math.random() * Math.PI * 2;
  constructor(x, y) {
    this.x = x;
    this.y = y;
  }
  findNearest() {
    for (let i = 0; i < points.length; i++) {
      if (this != points[i]) {
        let distance = Math.sqrt(
          Math.pow(this.x - points[i].x, 2) + Math.pow(this.y - points[i].y, 2)
        );
        if (distance < this.minimumdistance) {
          this.nearestneighbor = points[i];
          this.minimumdistance = distance;
        }
      }
    }
  }
  drawSelf() {
    //context.fillRect(this.x, this.y, 10, 10);
    this.x += Math.cos(this.direction) * 0.0001;
    this.y += Math.sin(this.direction) * 0.0001;
    if (this.x > 600 || this.x < 0) {
      this.direction = Math.PI - this.direction;
    }
    if (this.y > 600 || this.y < 0) {
      this.direction = -this.direction;
    }
  }
}
points = [];
for (i = 0; i < 10; i++) {
  points.push(new point(Math.random() * 600, Math.random() * 600));
}
// for (i = 0; i < points.length; i++) {
//   points[i].findNearest();
// }

res = 25;
currentX = 0;
currentY = 0;
currentInterval = 100;
var startTime = performance.now();
// for (lmaokek = 0; lmaokek < 600; lmaokek++) {
//   for (keklol = 0; keklol < 600; keklol++) {
//     lmao[lmaokek + keklol * 600] = `rgb(0,0,0)`;
//   }
// }
function update() {}
function draw() {
  for (m = 0; m < 600 * 32; m++) {
    if (currentX < 600) {
      currentX += (1 / res) * 100;
    } else {
      currentX = 0;
      currentY += (1 / res) * 100;
    }
    if (currentY > 600) {
      currentY = 0;
      currentX = 0;
      window.endTime = performance.now();
      currentInterval *= 1.2;
      //   console.log(
      //     Math.round(performance.now() - startTime),
      //     Math.round(currentInterval)
      //   );
      // imagedata = new ImageData(lmao, 600, 600);

      context.putImageData(imageData, 0, 0);
      context.drawImage(canvas, 0, 0, 4 * canvas.width, 4 * canvas.height);

      startTime = performance.now();
    }
    nearestPoint = points[0];
    nearestdistance = 9999999;
    for (k = 0; k < points.length; k++) {
      dist = Math.sqrt(
        Math.pow(currentX - points[k].x, 2) +
          Math.pow(currentY - points[k].y, 2)
      );
      if (dist < nearestdistance) {
        nearestPoint = points[k];
        nearestdistance = dist;
      }
    }
    arr[currentX + currentY * 600] = (1 / nearestdistance / 2.5) * 4000 * 2; // R value

    arr[currentX + currentY * 600 + 1] = (1 / nearestdistance / 2.5) * 5000 * 2; // G value

    arr[currentX + currentY * 600 + 2] = (1 / nearestdistance / 2.5) * 4000 * 2;

    arr[currentX + currentY * 600 + 3] = 255; // A value

    // context.fillStyle = `rgb(${(1 / nearestdistance) * 2500},${
    //   (1 / nearestdistance) * 2500
    // },${(1 / nearestdistance) * 2500})`;
    // context.fillRect(
    //   currentX,
    //   currentY,
    //   (1 / res) * 100 + 1,
    //   (1 / res) * 100 + 1
    // );
    // lmao.data[currentX + currentY * 600] = `rgb(${
    //   (1 / nearestdistance) * 2500
    // },${(1 / nearestdistance) * 2500},${(1 / nearestdistance) * 2500})`;

    for (i = 0; i < points.length; i++) {
      points[i].drawSelf();
      // }
      //   for (i = 0; i < 600; i += (1 / res) * 100) {
      //     for (j = 0; j < 600; j += (1 / res) * 100) {
      //       dist =
      //         (1 / Math.sqrt(Math.pow(i - point.x, 2) + Math.pow(j - point.y, 2))) *
      //         4000;
      //       context.fillStyle = `rgb(${dist},${dist},${dist})`;
      //       context.fillRect(i, j, (1 / res) * 100, (1 / res) * 100);
      //     }
    }
  }
}

function mouseup() {
  console.log(mouseX, mouseY);
}
