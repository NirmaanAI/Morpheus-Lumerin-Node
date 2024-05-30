import React from 'react';
import './pleaseRegisterCard.css';

function PleaseRegisterCard() {
    return (
        <div className="register-card">
            <div className="register-card-title"> 
            Please Register as a Provider or Connect Provider Wallet
            </div>
            
            <div className="register-card-subtitle">To view personalised Provider Stats and access full provider features</div>
            <div className="register-card-body">
                <p>Compute contributions will be available after the bootstrapping period. The Lumerin model as pioneered by Ryan Condron of Lumerin is being incorporated into Morpheus. More information can be found in the resources below.
                </p>
                <p>
                The Morpheus Lumerin Model utilizes the Lumerin protocol routing pattern to create a peer-to-peer, decentralized, and anonymous ecosystem for connecting AI users with AI model and agent compute providers. This model seeks to incorporate aspects of the original Morpheus white paper and yellow paper as well as core concepts from the Yellowstone Compute Model and Lake Travis System.
                The Lumerin Protocol is a P2P solution that enables data stream routing using smart contracts.
                </p>
                <p>
                Your hardware powers the Morpheus network. Supply compute resources, process user queries, and be rewarded in MOR based on demand and performance.
                This Lumerin and Morpheus partnership will allow providers to supply compute and intelligence to the Morpheus network.
                </p>
                
                
                <div className="button-container">
                <button class="border text-gray-50  duration-300 relative group cursor-pointer   overflow-hidden h-16 w-48 rounded-md bg-neutral-800 p-2  font-extrabold hover:bg-sky-700">

  <div class="absolute group-hover:-top-1 group-hover:-right-2 z-10 w-16 h-16 rounded-full group-hover:scale-150  duration-700 right-12 top-12 bg-yellow-500"></div>
  <div class="absolute group-hover:-top-1 group-hover:-right-2 z-10 w-12 h-12 rounded-full group-hover:scale-150  duration-700 right-20 -top-6 bg-orange-500"></div>
  <div class="absolute group-hover:-top-1 group-hover:-right-2 z-10 w-8 h-8   rounded-full group-hover:scale-150  duration-700 right-32 top-6 bg-pink-500"></div>
  <div class="absolute group-hover:-top-1 group-hover:-right-2 z-10 w-4 h-4   rounded-full group-hover:scale-150  duration-700 right-2 top-12 bg-red-600"></div>
  <p class="z-10 absolute bottom-2 left-2">Register</p>
</button>

<button class="border text-gray-50  duration-300 relative group cursor-pointer   overflow-hidden h-16 w-48 rounded-md bg-neutral-800 p-2  font-extrabold hover:bg-sky-700">

  <div class="absolute group-hover:-top-1 group-hover:-right-2 z-10 w-16 h-16 rounded-full group-hover:scale-150  duration-700 right-12 top-12 bg-yellow-500"></div>
  <div class="absolute group-hover:-top-1 group-hover:-right-2 z-10 w-12 h-12 rounded-full group-hover:scale-150  duration-700 right-20 -top-6 bg-orange-500"></div>
  <div class="absolute group-hover:-top-1 group-hover:-right-2 z-10 w-8 h-8   rounded-full group-hover:scale-150  duration-700 right-32 top-6 bg-pink-500"></div>
  <div class="absolute group-hover:-top-1 group-hover:-right-2 z-10 w-4 h-4   rounded-full group-hover:scale-150  duration-700 right-2 top-12 bg-red-600"></div>
  <p class="z-10 absolute bottom-2 left-2">Learn more</p>
</button>
                </div>
                <div className="social-icons">
                    <a href="https://mor.org/" className="social-icon"><i className="bi bi-currency-bitcoin"></i></a>
                    <a href="https://lumerinprotocol.medium.com/" className="social-icon"><i className="bi bi-medium"></i></a>
                    <a href="https://github.com/MorpheusAIs/Morpheus-Lumerin-Node" className="social-icon"><i className="bi bi-github"></i></a>
                    <a href="https://x.com/morpheusais?lang=en" className="social-icon"><i className="bi bi-twitter-x"></i></a>
                </div>
            </div>
        </div>
    );
}

export default PleaseRegisterCard;
