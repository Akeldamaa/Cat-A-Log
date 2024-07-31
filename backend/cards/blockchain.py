from web3 import Web3
          
def test_block_number(self):
    url = 'https://rpc.ankr.com/polygon'  # url string
    
    web3 = Web3(Web3.HTTPProvider(url))
    print(web3.eth.block_number)