Vagrant.configure("2") do |config|
  config.vm.box = "ubuntu/trusty64"
  config.vm.provision :shell, :path => "bootstrap.sh"
  config.vm.network :forwarded_port, guest: 4000, host: 4000
  config.vm.synced_folder ".", "/vagrant"
  config.ssh.forward_agent = true
  config.vm.network :private_network, ip: "33.33.33.10"
  config.vm.network :public_network
end
