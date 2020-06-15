
## VRoidをWebで動かしてスクショ取る

https://pixiv.github.io/three-vrm/examples/

https://pixiv.github.io/three-vrm/docs/enums/vrmschema.humanoidbonename.html

https://github.com/pixiv/three-vrm/blob/23e82361b758e5f425ca767e9419a49ec7d873da/examples/basic.html

https://stackoverflow.com/questions/26193702/three-js-how-can-i-make-a-2d-snapshot-of-a-scene-as-a-jpg-image

https://github.com/pixiv/three-vrm/blob/dev/examples/blendshapes.html

他の人の利用OKのVRM
https://hub.vroid.com/characters/2792872861023597723/models/5013769147837660446

## Firebase.jsのcore-js（3.6.?）が原因でビルドエラーになる

どりあえず、CDN版を使うようにする


## rootless dcoker

https://docs.docker.com/engine/security/rootless/

https://github.com/docker/for-linux/issues/885

'''
export SKIP_IPTABLES=1
curl -fsSL https://get.docker.com/rootless | sh

export XDG_RUNTIME_DIR=/tmp/docker-33333
export PATH=/home/gitpod/bin:$PATH
export DOCKER_HOST=unix:///tmp/docker-33333/docker.sock

/home/gitpod/bin/dockerd-rootless.sh --experimental --iptables=false --storage-driver vfs
'''
