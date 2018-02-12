
// 判断是否支持 WebGl
var supportsWebGL = ( function () {
    try {
        return !! window.WebGLRenderingContext && !! document.createElement( 'canvas' ).getContext( 'experimental-webgl' );
    } catch( e ) {
        return false;
    }
} )();

if(supportsWebGL){
    console.log("support");
}else{
    alert('您的浏览器太旧啦！请更新您的浏览器')
}
if (! Detector.webgl) Detector.addGetWebGLMessage()


var group,plane
var camera, scene, renderer,cameraTarget
var mesh, material
var container = document.getElementById('gameContainer')
var targetRotation = 6.7
var windowHalfX = container.offsetWidth
var windowHalfY = container.offsetHeight
var height = container.offsetHeight // of camera frustum
var width = container.offsetWidth

init()
animate()

function init () {

  // 初始化渲染器
  renderer = new THREE.WebGLRenderer({
    canvas: document.getElementById('cvs'),
    alpha: true,
    antialias: true
  })
  renderer.setClearColor(0xFFFFFF, 0.0)
  renderer.setPixelRatio(window.devicePixelRatio)
  renderer.setSize(windowHalfX, windowHalfY)
  container.appendChild(renderer.domElement)

  scene = new THREE.Scene()
  //                //添加坐标轴
  //                var axes = new THREE.AxisHelper( 20 )
  //                scene.add(axes)

  var aspect = windowHalfX / windowHalfY
  //				camera = new THREE.OrthographicCamera( - height * aspect, height * aspect, height, - height, 1, 10000 )
  camera = new THREE.PerspectiveCamera(45, aspect, 1, 10000)
  camera.position.z = 1500
  //                camera.position.y = 00
  cameraTarget = new THREE.Vector3(0, 200, 0)
  scene.add(camera)

  group = new THREE.Group()
  group.position.y = 100

  scene.add(group)

  // lights

  var spotLight = new THREE.SpotLight(0xffffff)
  spotLight.position.set(0, 10000, 0)
  spotLight.castShadow = true
  //               	spotLight.target=plane;//光源照射的方向
  spotLight.angle = Math.PI / 3; // 光源的角度
  scene.add(spotLight)

  // 初始化材质
  var textureLoader = new THREE.TextureLoader()
  // var normalMap = textureLoader.load( "http://or5y02dsh.bkt.clouddn.com/images/front/imgRbt/jqr.png" )
  var normalMap = textureLoader.load('./js/机器人.png')

  material = new THREE.MeshBasicMaterial({
    aoMap: normalMap
  })

  // 加载模型
  var mtlLoader = new THREE.MTLLoader()
  mtlLoader.load('http://or5y02dsh.bkt.clouddn.com/images/front/imgRbt/jqr.mtl', function (materials) {
    materials.preload()
    var loader = new THREE.OBJLoader()
    loader.load('http://or5y02dsh.bkt.clouddn.com/images/front/imgRbt/jqr.obj', function (groups) {
      var geometry = groups.children[ 0 ].geometry
      geometry.attributes.uv2 = geometry.attributes.uv
      geometry.center()

      mesh = new THREE.Mesh(geometry, material)
      mesh.scale.multiplyScalar(1.5)
      group.add(mesh)
    })
  })

  document.addEventListener('mousedown', onDocumentMouseDown, false)
  document.addEventListener('touchstart', onDocumentTouchStart, false)
  document.addEventListener('touchmove', onDocumentTouchMove, false)
  window.addEventListener('resize', onWindowResize, false)
}

function onWindowResize () {
  var aspect = windowHalfX / windowHalfY

  camera.left = - height * aspect
  camera.right = height * aspect
  camera.top = height
  camera.bottom = - height

  camera.updateProjectionMatrix()

  renderer.setSize(windowHalfX, windowHalfY)
}

function onDocumentMouseDown (event) {
  event.preventDefault()

  document.addEventListener('mousemove', onDocumentMouseMove, false)
  document.addEventListener('mouseup', onDocumentMouseUp, false)
  document.addEventListener('mouseout', onDocumentMouseOut, false)

  mouseXOnMouseDown = event.clientX - windowHalfX
  targetRotationOnMouseDown = targetRotation
}

function onDocumentMouseMove (event) {
  mouseX = event.clientX - windowHalfX

  targetRotation = targetRotationOnMouseDown + (mouseX - mouseXOnMouseDown) * 0.02
}

function onDocumentMouseUp (event) {
  document.removeEventListener('mousemove', onDocumentMouseMove, false)
  document.removeEventListener('mouseup', onDocumentMouseUp, false)
  document.removeEventListener('mouseout', onDocumentMouseOut, false)
}

function onDocumentMouseOut (event) {
  document.removeEventListener('mousemove', onDocumentMouseMove, false)
  document.removeEventListener('mouseup', onDocumentMouseUp, false)
  document.removeEventListener('mouseout', onDocumentMouseOut, false)
}

function onDocumentTouchStart (event) {
  if (event.touches.length == 1) {
    event.preventDefault()

    mouseXOnMouseDown = event.touches[ 0 ].pageX - windowHalfX
    targetRotationOnMouseDown = targetRotation
  }
}

function onDocumentTouchMove (event) {
  if (event.touches.length == 1) {
    event.preventDefault()

    mouseX = event.touches[ 0 ].pageX - windowHalfX
    targetRotation = targetRotationOnMouseDown + (mouseX - mouseXOnMouseDown) * 0.05
  }
}

function animate () {
  renderer.setSize(windowHalfX, windowHalfY)
  requestAnimationFrame(animate)
  render()
}

function render () {
  group.rotation.y = -6.6
  group.rotation.y += (targetRotation - group.rotation.y) * 1
  camera.lookAt(cameraTarget)
  renderer.setSize(windowHalfX, windowHalfY)
  renderer.render(scene, camera)
}
